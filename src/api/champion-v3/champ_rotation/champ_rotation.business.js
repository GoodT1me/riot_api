'use strict'

import sqlConfig from '../../../config/sequelize';

import * as DB from '../../../utilities/database';
import { ValidationError } from '../../../utilities/resources/errors';

const lol_cfg = require('../../../config/lol/lol_token.json')
const rp = require('request-promise');

const { ChampRotation } = sqlConfig;

const getWhereClauseById = id => Object.assign({}, {
  where: {
    id,
  },
});

const validateRegion =  (champ_rotation) => {
  if (! champ_rotation.region) {
    throw new ValidationError(400, 'required region');
  }
};

export default {

  list() {
    return DB.list(ChampRotation);
  },

  getById(id) {
    const options = Object.assign(getWhereClauseById(id));
    return DB.find(ChampRotation, options);
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
    validateRegion(body);
    rp(this.linkOptions(`https://${body.region}.${lol_cfg.post_links.champion_rotations}`))
      .then(function (repos) {
        console.log('===================================================================')
        repos.region_tag = body.region
        repos.champ_rotation_body = JSON.stringify(repos)
          return DB.create(ChampRotation, repos);
      })
      .catch(function (err) {
          console.log(err)
      });
  },

  async update(id, body) {
    console.log('_______________________________________________')
    console.log(body)
    await DB.find(ChampRotation, {
      ...getWhereClauseById(id),
      raw: true,
    });

    validateRegion(body);

    Object.assign(body, { id });

    return DB.update(ChampRotation, body);
  },

  destroy(id) {
    return DB.destroy(ChampRotation, getWhereClauseById(id));
  }
};
