'use strict'

import sqlConfig from '../../../config/sequelize';

import * as DB from '../../../utilities/database';
import { ValidationError } from '../../../utilities/resources/errors';

const lol_cfg = require('../../../config/lol/lol_token.json')
const rp = require('request-promise');

const { League } = sqlConfig;

const getWhereClauseById = id => Object.assign({}, {
  where: {
    id,
  },
});

const validateLeagueId =  (league) => {
  if (! (league.leagueId && league.region)) {
    throw new ValidationError(400, 'required leagueId or region');
  }
};

export default {

  list() {
    return DB.list(League);
  },

  getById(summonerId) {
    const options = Object.assign(getWhereClauseById(summonerId));
    return DB.find(League, options);
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
    validateLeagueId(body);
    // rp(this.linkOptions(`https://${body.region}.api.riotgames.com/lol/league/v3/leagues/${body.leagueId}`))
    rp(this.linkOptions(`https://${body.region}.${lol_cfg.post_links.league}${body.leagueId}`))
      .then(function (repos) {
        console.log('===================================================================')
        repos.leagues_body = JSON.stringify(repos )
          return DB.create(League, repos);
      })
      .catch(function (err) {
          console.log(err)
      });
  },

  async update(id, body) {
    console.log('_______________________________________________')
    console.log(body)
    await DB.find(League, {
      ...getWhereClauseById(id),
      raw: true,
    });

    validateSummonerName(body);

    Object.assign(body, { id });

    return DB.update(League, body);
  },

  destroy(summonerId) {
    return DB.destroy(League, getWhereClauseById(summonerId));
  }
};
