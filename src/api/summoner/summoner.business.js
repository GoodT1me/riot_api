'use strict'

import sqlConfig from '../../config/sequelize';

import * as DB from '../../utilities/database';
import { ValidationError } from '../../utilities/resources/errors';
import { NotFoundError } from '../../utilities/database/db-errors';
import Riot from '../../config/riot'

const rp = require('request-promise');
const { Summoner } = sqlConfig;

const getWhereClauseBySummonerId = id => Object.assign({}, {
  where: {
    id,
  },
});

const getWhereClauseBySummonerName = summoner_name => Object.assign({}, {
  where: {
    summoner_name,
  },
});

const getWhereClauseByAccountId = accountId => Object.assign({}, {
  where: {
    accountId,
  },
});

const validateAccountId = (summoner) => {
  if (! (summoner.accountId && summoner.region)) {
    throw new ValidationError(400, 'required summoner name or region');
  }
};

const validateSummonerName = (summoner) => {
  if (! (summoner.summoner_name && summoner.region)) {
    throw new ValidationError(400, 'required summoner name or region');
  }
};

const validateSummonerId = (summoner) => {
  if (! (summoner.summonerId && summoner.region)) {
    throw new ValidationError(400, 'required summoner name or region');
  }
};

export default {

  list() {
    return DB.list(Summoner);
  },

  getBySummonerId(summonerId) {
    const options = getWhereClauseBySummonerId(summonerId);
    return DB.find(Summoner, options);
  },

  async getBySummonerName(region, summonerName) {

    const riot = new Riot()
    const options = getWhereClauseBySummonerName(summonerName);
    let db_summoner = null

    try {
      db_summoner = await DB.find(Summoner, options);

      if(db_summoner instanceof Summoner) {
        return(db_summoner)
      }

    } catch (e) {
      if (e instanceof NotFoundError) {
        return rp(riot.getSummonerByName(region, summonerName))
        .then(function (repos) {
            repos.summoner_name = repos.name
            repos.region = region
            repos.summonerId = repos.id
            delete repos.id
            return DB.create(Summoner, repos);
        })
      } else {
        console.log(e);
      }
    }
  },

  getByAccountId(accountId) {
    const options = Object.assign(getWhereClauseByAccountId(accountId));
    return DB.find(Summoner, options);
  },

  async create(body) {

    if(body.summoner_name){
      validateSummonerName(body);
      rp(this.linkOptions(`https://${body.region}.${lol_cfg.post_links.summoner_by_name}${body.summoner_name}`))
        .then(function (repos) {
            repos.summoner_name = repos.name
            repos.region = body.region
            return DB.create(Summoner, repos);
        })
        .catch(function (err) {
          console.log(err)
        });
    }else if(body.accountId){
      validateAccountId(body)
      rp(this.linkOptions(`https://${body.region}.${lol_cfg.post_links.summoner_by_account}${body.accountId}`))
      .then(function (repos) {
          repos.summoner_name = repos.name
          repos.region = body.region
          return DB.create(Summoner, repos);
      })
    }else if(body.summonerId){
      validateSummonerId(body)
      rp(this.linkOptions(`https://${body.region}.${lol_cfg.post_links.summoner}${body.summonerId}`))
      .then(function (repos) {
          repos.summoner_name = repos.name
          repos.region = body.region
          return DB.create(Summoner, repos);
      })
    }
  },

  async update(id, body) {
    await DB.find(Summoner, {
      ...getWhereClauseById(id),
      raw: true,
    });

    validateSummonerName(body);

    Object.assign(body, { id });

    return DB.update(Summoner, body);
  },

  destroyBySummonerId(summonerId) {
    return DB.destroy(Summoner, getWhereClauseBySummonerId(summonerId));
  },

  destroyBySummonerName(summonerName) {
    return DB.destroy(Summoner, getWhereClauseBySummonerName(summonerName));
  },

  destroyByAccountId(accountId) {
    return DB.destroy(Summoner, getWhereClauseByAccountId(accountId));
  }
};
