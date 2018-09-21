import { ValidationError } from '../../utilities/resources/errors';

const riot_cfg = require('./riot_cfg.json');
const dev_token = require('../../config/riot/riot_cfg.json')

export default class Riot {

  constructor(){
    console.log('===constructor from riot===')
  }

  linkOptions(url) {
    let options = {
      uri: url,
      headers: {
          'X-Riot-Token': dev_token.token //This API key is to be used for development only
      },
      json: true // Automatically parses the JSON string in the response
    };
    return options
  }

  validateRegion(region) {
    let arrayOfRegions = riot_cfg.RIOT_API.REGIONS.split(".")
    
    if (arrayOfRegions.includes(region)) {
      return true
    } return false
  }

  generateRiotEndpoints(region) {
    if(this.validateRegion(region)) {
      let endpoints = {}

      if (riot_cfg.RIOT_API) {
        for (let property in riot_cfg.RIOT_API.ENDPOINTS) {
          endpoints[property] = `https://${region}.${riot_cfg.RIOT_API.DOMAIN}${riot_cfg.RIOT_API.ENDPOINTS[property]}`
        }
      }
      return endpoints
    }throw new ValidationError(400, 'required region');
  }
    
  getSummonerByName(region, summonerName) {
    return this.linkOptions(`${this.generateRiotEndpoints(region).GET_SUMMONER_BY_NAME}${summonerName}`)
  }

}