'use strict'

import sqlConfig from '../../../config/sequelize';

import * as DB from '../../../utilities/database';
import { ValidationError } from '../../../utilities/resources/errors';

const lol_cfg = require('../../../config/lol/lol_token.json')
const rp = require('request-promise');

const { Timeline } = sqlConfig;

const getWhereClauseById = id => Object.assign({}, {
  where: {
    id,
  },
});

const validateGameId =  (timeline) => {
  if (! (timeline.gameId && timeline.region)) {
    throw new ValidationError(400, 'required gameId or region');
  }
};

export default {

  list() {
    return DB.list(Timeline);
  },

  getById(id) {
    const options = Object.assign(getWhereClauseById(id));
    return DB.find(Timeline, options);
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
    rp(this.linkOptions(`https://${body.region}.${lol_cfg.post_links.timeline_by_gameId}${body.gameId}`))
      .then(function (repos) {
        console.log('===================================================================')
        repos.gameId = body.gameId
        repos.timeline_body = JSON.stringify(repos)
          return DB.create(Timeline, repos);
      })
      .catch(function (err) {
          console.log(err)
      });
  },

  async update(id, body) {
    console.log('_______________________________________________')
    console.log(body)
    await DB.find(Timeline, {
      ...getWhereClauseById(id),
      raw: true,
    });

    validateGameId(body);

    Object.assign(body, { id });

    return DB.update(Timeline, body);
  },

  destroy(id) {
    return DB.destroy(Timeline, getWhereClauseById(id));
  }
};
