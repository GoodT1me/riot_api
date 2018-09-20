import Sequelize from 'sequelize';
import Umzug from 'umzug';

import { sequelize } from './sequelize';
import Log from '../utilities/log';

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: { sequelize },

  migrations: {
    params: [
      sequelize.getQueryInterface(),
      Sequelize,
    ],
    path: `${__dirname}/../db-migration/migrations`,
    pattern: /\.js$/
  },
});

const logUmzugEvent = eventName => (name) => {
  Log.info(`${eventName} :: ${name}`);
};

const printStatus = () => Promise.all([umzug.executed(), umzug.pending()])
  .then(results => Object.assign({}, {
    executed: results[0].map(m => m.file),
    pending: results[1].map(m => m.file),
  }))
  .then((status) => {
    Log.info(JSON.stringify(status, null, 2));
    return status;
  });

umzug.on('migrating', logUmzugEvent('migrating'));
umzug.on('migrated', logUmzugEvent('migrated'));
umzug.on('reverting', logUmzugEvent('reverting'));
umzug.on('reverted', logUmzugEvent('reverted'));

export default () => umzug.up().then(printStatus);
