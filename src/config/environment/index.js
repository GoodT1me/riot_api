/* eslint global-require: 0, import/no-dynamic-require:0 */

import path from 'path';
import _ from 'lodash';

const root = path.normalize(`${__dirname}/../..`);

const all = {
  env: process.env.NODE_ENV || 'local',


  port: process.env.PORT || 9000,
  ip: process.env.IP || '0.0.0.0',

  root,
  TEMP_PATH: path.join(root, '../tmp'),

  database: {
    seedDB: false,
    forceDB: false,
  },

  log: 'debug',

  JWT_SECRET: process.env.JWT_SECRET || 'default-jwt-secret',

  sequelize: {
    database: process.env.RDS_DB_NAME,
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    options: {
      host: process.env.RDS_HOSTNAME,
      port: process.env.RDS_PORT,
      dialect: 'mysql',
      define: {
        timestamps: false,
        underscored: false,
      },
      pool: {
        max: 50,
        min: 1,
        idle: 20000,
        evict: 20000,
        acquire: 20000
      }
    },
  },

  redis: {
    host: `${process.env.REDIS_HOSTNAME}`,
    port: process.env.REDIS_PORT || 6379,
  },

  swagger: {
    host: `${process.env.HOSTNAME}`
  }
};

export default _.merge(
  all,
  require(`./${all.env}.js`).default || {},
);
