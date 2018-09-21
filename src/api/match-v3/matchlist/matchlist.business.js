'use strict'

import sqlConfig from '../../../config/sequelize';

import * as DB from '../../../utilities/database';
import { ValidationError } from '../../../utilities/resources/errors';

const lol_cfg = require('../../../config/riot/riot_cfg.json')
const rp = require('request-promise');

const { Matchlist } = sqlConfig;

const getWhereClauseById = id => Object.assign({}, {
  where: {
    id,
  },
});

const validateAccountId =  (matchlist) => {
  if (! (matchlist.accountId && matchlist.region)) {
    throw new ValidationError(400, 'required matchlist or region');
  }
};

export default {

  list() {
    return DB.list(Matchlist);
  },

  getById(summonerId) {
    const options = Object.assign(getWhereClauseById(summonerId));
    return DB.find(Matchlist, options);
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
    validateAccountId(body);
    rp(this.linkOptions(`https://${body.region}.${lol_cfg.post_links.matchlists_by_account}${body.accountId}`))
      .then(function (repos) {
        console.log('===================================================================')
        repos.accountId = body.accountId
        repos.matchlist_body = JSON.stringify(repos)
          return DB.create(Matchlist, repos);
      })
      .catch(function (err) {
          console.log(err)
      });
  },

  async update(id, body) {
    console.log('_______________________________________________')
    console.log(body)
    await DB.find(Matchlist, {
      ...getWhereClauseById(id),
      raw: true,
    });

    validateSummonerName(body);

    Object.assign(body, { id });

    return DB.update(Matchlist, body);
  },

  destroy(summonerId) {
    return DB.destroy(Matchlist, getWhereClauseById(summonerId));
  }
};
