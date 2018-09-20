/* globals describe, it, beforeEach, afterEach */
/* eslint no-unused-expressions: 0 */

import _ from 'lodash';
import sinon from 'sinon';
import SequelizeMock from 'sequelize-mock';

import * as DbUtilities from './index';

const DBConnectionMock = new SequelizeMock();

const dataMock = {
  id: _.random(0, 100000, false),
  name: 'Test Model',
};

describe('Database Utilities :: ', () => {
  let sandbox = null;
  const Model = DBConnectionMock.define('test', dataMock);

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    if (sandbox) {
      sandbox.restore();
    }
  });

  it('Should check whether model passed is valid or not', () => {
    DbUtilities.list({}).should.be.rejectedWith(Error);
    DbUtilities.list(Model).should.be.fulfilled;
  });

  it('Should list all entries from model', () => {
    DbUtilities.list(Model)
      .should.eventually.be.a('array');
  });

  it('Should retrieve a single model as per options', () => {
    DbUtilities.find(Model, {
      where: {
        id: dataMock.id,
      },
    }).should.eventually.have.property('name');
  });

  it('Should create a new entry for a specific model', () => {
    const spy = sandbox.spy(Model, 'create');

    DbUtilities.create(Model, { id: 1, name: 'Created' })
      .should.be.fulfilled
      .then(() => spy.should.have.been.called);
  });

  it('Should create a list of entries for a specific model', () => {
    const spy = sandbox.spy(Model, 'bulkCreate');

    DbUtilities.bulkCreate(Model, [{ id: 1, name: 'Created' }, { id: 2, name: 'Created 2' }])
      .should.be.fulfilled
      .then(() => spy.should.have.been.called);
  });

  it('Should update an entity without versioning', () => {
    DbUtilities.update(Model, { id: 1, name: 'Created' }).should.be.fulfilled;
  });

  it('Should delete an entity', () => {
    DbUtilities.destroy(Model, { where: { id: 1 } }).should.be.fulfilled;
  });
});
