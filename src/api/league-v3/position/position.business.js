'use strict'

import sqlConfig from '../../../config/sequelize';

import * as DB from '../../../utilities/database';
import { ValidationError } from '../../../utilities/resources/errors';
import constants from '../../commons/constants'

const lol_cfg = require('../../../config/riot/riot_cfg.json')
const rp = require('request-promise');

const { Position } = sqlConfig;

const getWhereClauseById = id => Object.assign({}, {
  where: {
    id,
  },
});

const validateSummonerId = (position) => {
  if (! (position.summonerId && position.region)) {
    throw new ValidationError(400, 'required summonerId or region');
  }
};

export default {

  list() {
    return DB.list(Position);
  },

  getById(summonerId) {
    const options = Object.assign(getWhereClauseById(summonerId));
    return DB.find(Position, options);
  },

  linkOptions(url) {
    let options = {
      uri: url,
      headers: {
          // 'X-Riot-Token': 'RGAPI-92506965-68fa-4d4f-ae37-63dffbe4e978' //This API key is to be used for development only
          'X-Riot-Token': lol_cfg.token //This API key is to be used for development only
      },
      json: true // Automatically parses the JSON string in the response
    };
    return options
  },

  async create(body) {
    validateSummonerId(body);
    const repos = await rp(this.linkOptions(`https://${body.region}.${lol_cfg.post_links.position}${body.summonerId}`))

    riotApi.fetchData(constants.RIOT_API.ENDPOINTS.GET_SUMMONER_BY_ID, params)

    repos[0].flex_rank = repos[0].rank
    repos[0].region = body.region
    repos[1].flex_rank = repos[1].rank
    repos[1].region = body.region

    const data = await Promise.all([
      DB.create(Position, repos[0]),
      DB.create(Position, repos[1])
    ])

    return data
  },

  async update(id, body) {
    console.log('_______________________________________________')
    console.log(body)
    await DB.find(Position, {
      ...getWhereClauseById(id),
      raw: true,
    });

    validateSummonerName(body);

    Object.assign(body, { id });

    return DB.update(Position, body);
  },

  destroy(summonerId) {
    return DB.destroy(Position, getWhereClauseById(summonerId));
  }
};
