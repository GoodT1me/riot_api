/**
 * Passport configuration
 */

import { merge } from 'lodash';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import jwt from 'jsonwebtoken';

import Redis from './redis';
import config from './environment';

export const getToken = (payload, options = {}) => jwt.sign(
  payload,
  config.JWT_SECRET,
  merge({
    expiresIn: '24h',
  }, options)
);

export default (app) => {
  const jwtOptions = {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
  };

  const strategy = new passportJWT.Strategy(jwtOptions, (jwtPayload, next) => {
    const {
      jti,
    } = jwtPayload;

    Redis.get(jti)
      .then((user) => {
        if (user) {
          return next(null, merge(user, jwtPayload));
        }

        return next(null, false);
      });
  });

  passport.use(strategy);
  app.use(passport.initialize());
};

