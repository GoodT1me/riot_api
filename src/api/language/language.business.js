import sqlConfig from '../../config/sequelize';

import * as DB from '../../utilities/database';
import { ValidationError } from '../../utilities/resources/errors';

const { Language } = sqlConfig;

const getWhereClauseById = id => Object.assign({}, {
  where: {
    id,
  },
});

const getWhereClauseByActive = () => Object.assign({}, {
  where: {
    active: 1
  }
});

const validate = (language) => {
  if(! language.code) {
    throw new ValidationError(400, 'required language code');
  }
};

export default {

  list() {
    return DB.list(Language);
  },

  getById(languageId) {
    const options = Object.assign(getWhereClauseById(languageId));
    return DB.find(Language, options);
  },

  getByCode(code) {
    return DB.find(Language, {
      where: {
        code
      }
    });
  },

  async create(body) {
    validate(body);
    return DB.create(Language, body);
  },

  async update(id, body) {
    await DB.find(Language, {
      ...getWhereClauseById(id),
      raw: true,
    });

    validate(body);

    Object.assign(body, { id });

    return DB.update(Language, body);
  },

  destroy(languageId) {
    return DB.destroy(Language, getWhereClauseById(languageId));
  }
};
