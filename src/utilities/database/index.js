import _ from 'lodash';
import fs from 'fs';

import { NotFoundError } from './db-errors';

import Log from '../log';
import { pluralize } from '../../api/commons/utils';
// Private methods

const sequelizeMethods = ['find', 'findAll', 'findOrCreate', 'create', 'update', 'bulkCreate', 'destroy'];
const wrapModelCheck = Model => new Promise((resolve) => {
  if (Model && sequelizeMethods.every(method => method in Model)) {
    resolve(Model);
  }

  throw new Error('Model is not a sequelize model :: ', Model);
});

const wrapModelFind = (Model, options) => wrapModelCheck(Model)
  .then(() => Model.find(options))
  .then((entity) => {
    if (!entity) {
      throw new NotFoundError();
    }

    return entity;
  });

const wrapExists = (Model, options) => wrapModelCheck(Model)
  .then(() => Model.find(options))
  .then((entity) => {
    if (!entity) {
      return Object.assign({}, { exists: false });
    }

    return Object.assign({}, { exists: true });
  });

const parseSequelizeError = (error) => {
  const items = _.get(error, 'errors', []);
  Log.error(items.reduce(
    (str, i) => `${str};\n${_.get(i, 'message', JSON.stringify(i))}`,
    '',
  ));
  throw error;
};


// Public methods
export const count = (Model, options = {}) => wrapModelCheck(Model)
  .then(() => Model.count(options));

export const list = (Model, options = {}) => wrapModelCheck(Model)
  .then(() => Model.findAll(options));

export const find = (Model, options) => wrapModelFind(Model, options);

export const exists = (Model, options) => wrapExists(Model, options);

export const findOrCreate = async (Model, options, user) => {
  try {
    await wrapModelCheck(Model);
    const userId = user ? user.id : null;
    Object.assign(options.defaults, { changedBy: userId, changedOn: new Date() });

    const [createdModel, created] = await Model.findOrCreate(options);
    return { model: createdModel, created };
  } catch (err) {
    return parseSequelizeError(err);
  }
};

export const create = async (Model, data, options, user) => {
  try {
    await wrapModelCheck(Model);
    const userId = user ? user.id : null;
    Object.assign(data, { changedBy: userId, changedOn: new Date() });
    if (options && options.include) {
      const subModels = options.include.map((sm) => {
        if (sm.model) {
          return sm.model;
        }
        return sm;
      });
      _.each(subModels, (SubModel) => {
        const subModelData = data[SubModel.name] || data[`${SubModel.name}s`] || data[`${SubModel.name}es`];
        if (subModelData) {
          if (_.isArray(subModelData)) {
            _.each(subModelData, entity =>
              Object.assign(entity, {
                changedBy: userId,
                changedOn: new Date()
              }));
          } else {
            Object.assign(subModelData, {
              changedBy: userId,
              changedOn: new Date()
            });
          }
        }
      });
    }

    return Model.create(data, options);
  } catch (err) {
    return parseSequelizeError(err);
  }
};

export const bulkCreate = (Model, data, options, user) => wrapModelCheck(Model)
  .then(() => {
    const userId = user ? user.id : null;
    data.forEach(e => Object.assign(e, { changedBy: userId, changedOn: new Date() }));
    return Model.bulkCreate(data, options);
  })
  .catch(parseSequelizeError);

export const updateAssociations = (modelInstance, SubModel, data, removeAssociationsOnly) => {
  const associationFnName = _.isArray(data) ? pluralize(SubModel.name) : SubModel.name;

  return modelInstance[`get${associationFnName}`]()
    .then((currentAssociations) => {
      if (_.isArray(currentAssociations)) {
        const assocsToUpdate = _.intersectionBy(currentAssociations, data, 'id');
        const assocsToRemove = _.differenceBy(currentAssociations, data, 'id');
        const assocsToCreate = _.differenceBy(data, currentAssociations, 'id');

        return Promise.all([
          ...assocsToRemove.map((i) => {
            if (removeAssociationsOnly && removeAssociationsOnly === true) {
              return modelInstance[`remove${SubModel.name}`](i);
            }

            return i.destroy();
          }),
          ...assocsToCreate.map((d) => {
            if (!d.id) {
              return modelInstance[`create${SubModel.name}`](d);
            }

            return modelInstance[`add${SubModel.name}`](d.id);
          }),
          ...assocsToUpdate.map(i => i.update(_.find(data, { id: i.id }))),
        ]);
      } else if (currentAssociations) {
        return currentAssociations.update(data);
      }

      return data ? modelInstance[`create${SubModel.name}`](data) : null;
    });
};

export const updateManyToManyAssociations = async (model, SubModel, data, as) => {
  const assocName = pluralize(SubModel.name);
  const currentAssociations = await model[`get${assocName}`]();
  const assocsToRemove = _.differenceBy(currentAssociations, data, 'id');
  const assocsToAdd = _.differenceBy(data, currentAssociations, 'id');

  return Promise.all([
    ...assocsToRemove.map(assoc => (assoc[as]).destroy()),
    ...assocsToAdd.map(assoc => model[`add${assocName}`](assoc.id)),
  ]);
};

export const update = (Model, data, options, AuditModel, user) => wrapModelFind(
  Model,
  { where: { id: data.id } }
)
  .then(async (model) => {
    if (AuditModel) {
      Log.info(`Creating audit for entity: ${Model.name}`);
      const previousVersion = _.cloneDeep(model.dataValues);
      const fkey = `${_.lowerFirst(Model.name)}Id`;
      Object.assign(previousVersion, { [fkey]: data.id, id: null });
      await AuditModel.create(previousVersion);
      Object.assign(
        data,
        { changedBy: user.id },
        { changedOn: new Date() },
        { revision: previousVersion.revision + 1 }
      );
    }
    return model.update(data, options);
  })
  .then((model) => {
    if (options && options.include) {
      const subModels = options.include.map((sm) => {
        if (sm.model) {
          return sm.model;
        }
        return sm;
      });
      const promises = subModels.map((SubModel) => {
        const subModelData = data[SubModel.name] || data[`${SubModel.name}s`] || data[`${SubModel.name}es`];
        return updateAssociations(model, SubModel, subModelData, options.removeAssociationsOnly);
      });

      return Promise.all(promises)
        .then(() => model);
    }

    return model;
  })
  .catch(parseSequelizeError);

export const createAuditRecord = (Model, AuditModel, entity) => {
  Log.info(`Creating audit for entity: ${Model.name}`);
  const previousVersion = _.cloneDeep(entity.dataValues);
  const fkey = `${_.lowerFirst(Model.name)}Id`;
  Object.assign(previousVersion, { [fkey]: entity.id, id: null });
  return AuditModel.create(previousVersion);
};

export const destroy = async (Model, options, AuditModel) => {
  try {
    const entity = await wrapModelFind(Model, options);
    if (AuditModel) {
      await createAuditRecord(Model, AuditModel, entity);
    }
    // TBD: in order to get true audit we would need to implement soft delete
    return entity.destroy();
  } catch (err) {
    return parseSequelizeError(err);
  }
};

export const updateOneToOne = async (model, childModel, data, foreignKey) => {
  const childObject = await model[`get${childModel.name}`]();
  if (childObject && (!data || _.isEmpty(data))) {
    await destroy(childModel, {
      where: {
        id: childObject.id,
      }
    });
  } else if (!_.isEmpty(data) && !data.id) {
    if (childObject) {
      await destroy(childModel, {
        where: {
          id: childObject.id,
        }
      });
    }
    await create(childModel, Object.assign(data, { [foreignKey]: model.id }));
  } else if (!_.isEmpty(data) && data.id) {
    await update(childModel, data);
  }
};

export const readSqlFileAndExecute = (file, sequelize) => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      return reject(err);
    }

    const executeQuery = query => sequelize.query(query, {
      raw: true,
    }).spread(() => true);

    // It was throwing an weird error when executing the whole file
    // Instead, this code executes each command in sequence
    return data
      .split(';')
      .map(cmd => cmd.trim())
      .map(cmd => () => executeQuery(cmd))
      .reduce((previous, cmd) => previous.then(() => cmd()), Promise.resolve())
      .then(() => resolve());
  });
});

export default {
  list,
  find,
  findOrCreate,
  create,
  bulkCreate,
  updateAssociations,
  update,
  destroy,
  readSqlFileAndExecute,
};

