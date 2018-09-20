'use strict'

import sqlConfig from '../../../config/sequelize';

import * as DB from '../../../utilities/database';
import { ValidationError } from '../../../utilities/resources/errors';

const lol_cfg = require('../../../config/lol/lol_token.json')
const rp = require('request-promise');

const { Match } = sqlConfig;

const getWhereClauseById = id => Object.assign({}, {
  where: {
    id,
  },
});

const validateGameId =  (match) => {
  if (! (match.gameId && match.region)) {
    throw new ValidationError(400, 'required gameId or region');
  }
};

export default {

  list() {
    return DB.list(Match);
  },

  getById(summonerId) {
    const options = Object.assign(getWhereClauseById(summonerId));
    return DB.find(Match, options);
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
    rp(this.linkOptions(`https://${body.region}.${lol_cfg.post_links.match_by_gameId}${body.gameId}`))
      .then(function (repos) {
        console.log('===================================================================')
        repos.match_body = JSON.stringify(repos)
          return DB.create(Match, repos);
      })
      .catch(function (err) {
          console.log(err)
      });
  },

  async update(id, body) {
    console.log('_______________________________________________')
    console.log(body)
    await DB.find(Match, {
      ...getWhereClauseById(id),
      raw: true,
    });

    validateGameId(body);

    Object.assign(body, { id });

    return DB.update(Match, body);
  },

  destroy(summonerId) {
    return DB.destroy(Match, getWhereClauseById(summonerId));
  }
};
