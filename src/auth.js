import uuidv1 from 'uuid/v1';

import Redis from './config/redis';

import { getToken } from './config/passport';
import authenticate from './utilities/security';

import Log from './utilities/log';

import UserService from './api/user/user.business';

export default (app) => {
  app.post('/login', (req, res) => {
    const {
      username,
      password,
    } = req.body;

    if (username && password) {
      UserService.validateCredentials(username, password)
        .then((user) => {
          const payload = {
            ...user,
            scope: [],
          };

          const jti = uuidv1();
          const token = getToken({ jti });

          const expireAt = new Date();
          expireAt.setHours(expireAt.getHours() + 20);

          Redis.create(jti, payload, expireAt)
            .then(() => res.json({
              message: 'Logged in',
              user: {
                id: user.id,
                roles: user.roles,
                firstName: user.firstName,
                lastName: user.lastName,
                company: user.company,
              },

              token,
            }));
        })
        .catch(() => {
          Log.error(`Incorrect login attempt :: ${username}`);
          res.status(401).json({
            message: 'Credentials are invalid',
          });
        });
    } else {
      res.status(401).json({
        message: 'Username and Password are required',
      });
    }
  });

  app.delete('/logout', authenticate(), (req, res, next) => {
    const {
      jti,
    } = req.user;

    return Redis.delete(jti)
      .then(() => res.status(204).send())
      .catch((err) => {
        Log.error('Unable to logout user ::');
        Log.error(err);

        next(err);
      });
  });
};
