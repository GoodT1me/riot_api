import { pick, omit, mergeWith } from 'lodash';
import sqlConfig from '../../config/sequelize';

import * as DB from '../../utilities/database';
import { getHashFromString } from '../../utilities/crypto';
import { ValidationError } from '../../utilities/resources/errors';
import TranslateService from './user.translate';

const { User } = sqlConfig;

const getWhereClauseById = id => Object.assign({}, {
  where: {
    id,
  },
});

export default {
  list() {
    const options = {
      attributes: {
        exclude: ['username', 'password'],
      },
    };

    return DB.list(User, options);
  },

  getById(userId) {
    const options = Object.assign({
      attributes: {
        exclude: ['password']
      },
    }, getWhereClauseById(userId));

    return DB.find(User, options);
  },

  async create(body, loggedInUser) {
    const user = TranslateService.getUserFromRequestBody(body);
    user.active = (user.active || 1);
    const options = {
      where: {
        username: user.username,
      },
      defaults: user
    };

    const { model: createdUser, created } =
      await DB.findOrCreate(User, options, loggedInUser);

    if (!created) {
      throw new ValidationError(400, 'User already exists');
    }

    return createdUser;
  },

  async update(loggedInUser, id, body) {
    const loggedUserId = loggedInUser.id;
    if (`${loggedUserId}` === `${id}`) {
      const user = await DB.find(User, {
        ...getWhereClauseById(loggedUserId),
        raw: true,
      });
      const userFromBody = TranslateService.getUserFromRequestBody(body);
      mergeWith(user, userFromBody, (dstVal, srcVal) => (srcVal !== null ? srcVal : dstVal));

      if (userFromBody.password && userFromBody.currentPassword) {
        try {
          await this.validateCredentials(user.username, userFromBody.currentPassword);
        } catch (error) {
          throw new Error('Wrong Password');
        }

        if (userFromBody.password !== userFromBody.confirmPassword) {
          throw new Error('Passwords don\'t match');
        }
      }

      return DB.update(User, pick(user, [
        'id',
        'firstName',
        'lastName',
        'password',
      ]), {}, loggedInUser);
    }

    throw new Error('Forbidden');
  },

  destroy(userId) {
    return DB.destroy(User, getWhereClauseById(userId));
  },

  validateCredentials(username, password) {
    const hashedPassword = getHashFromString(password);

    return DB.find(User, {
      raw: true,
      where: {
        username,
      },
    })
      .then((user) => {
        if (user.password !== hashedPassword) {
          throw new Error('Invalid Credentials');
        }

        return omit(user, ['password']);
      });
  },

};
