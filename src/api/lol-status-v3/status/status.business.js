'use strict'

import sqlConfig from '../../../config/sequelize';

import * as DB from '../../../utilities/database';
import { ValidationError } from '../../../utilities/resources/errors';

const lol_cfg = require('../../../config/riot/riot_cfg.json')
const rp = require('request-promise');

const { Status } = sqlConfig;

const getWhereClauseById = id => Object.assign({}, {
  where: {
    id,
  },
});

const validateGameId =  (status) => {
  if (! (status.region)) {
    throw new ValidationError(400, 'required region');
  }
};

export default {

  list() {
    return DB.list(Status);
  },

  getById(id) {
    const options = Object.assign(getWhereClauseById(id));
    return DB.find(Status, options);
  },

  linkOptions(url) {
    let options = {
      uri: url,
      headers: {
          'X-Riot-Token': lol_cfg.token //This API key is to be used for development only
      },
      json: true // Automatically parses the JSON string in the response
    };
    return options
  },

  async create(body) {
    validateGameId(body);
    rp(this.linkOptions(`https://${body.region}.${lol_cfg.post_links.status}`))
      .then(function (repos) {
        console.log('===================================================================')
        repos.server_name = repos.name
        repos.status_body = JSON.stringify(repos)
          return DB.create(Status, repos);
      })
      .catch(function (err) {
          console.log(err)
      });
  },

  async update(id, body) {
    console.log('_______________________________________________')
    console.log(body)
    await DB.find(Status, {
      ...getWhereClauseById(id),
      raw: true,
    });

    validateGameId(body);

    Object.assign(body, { id });

    return DB.update(Status, body);
  },

  destroy(id) {
    return DB.destroy(Status, getWhereClauseById(id));
  }
};
