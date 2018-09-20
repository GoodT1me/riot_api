import Sequelize from 'sequelize';
import _ from 'lodash';

import config from './environment';
import Models from '../models';
import Log from '../utilities/log';


const {
  database,
  username,
  password,
  options,
} = config.sequelize;

export const sequelize = new Sequelize(database, username, password, options);

const dbModels = {};

Models.forEach((file) => {
  Log.info(`Loading model :: ${file}`);
  const model = sequelize.import(file);
  dbModels[model.name] = model;
});

// run the associations defined in each model's class
_.forEach(dbModels, (model) => {
  if ('associate' in model) {
    model.associate(dbModels);
  }
  if ('hooks' in model) {
    _.forEach(model.hooks, (fn, hook) => {
      model.hook(hook, (entity, hookOptions) => {
        fn(entity, hookOptions, dbModels);
      });
    });
  }
});

export default { Sequelize, sequelize, ...dbModels };
