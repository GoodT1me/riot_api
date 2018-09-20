
import constants from '../api/commons/constants';

import rp from 'request-promise'
const { ENDPOINTS } = constants.RIOT_API.ENDPOINTS;

console.log(ENDPOINTS)

export default class RiotApi {
  constructor(apiKey, region, options = {}) {
    this.apiKey = apiKey
    this.region = region
    this.domain = options.DOMAIN || 'api.riotgames.com'
  }

  getSummonerByName(params) {
    return this.generateRequest(ENDPOINTS.GET_SUMMONER_BY_NAME, params)
  }

  generateRequest(endpoint, params) {
    return {
      uri: endpoint + params,
      headers: {
          'X-Riot-Token': this.apiKey //This API key is to be used for development only
      },
      json: true // Automatically parses the JSON string in the response
    };
  }

  handleRequest(request){
    return rp(request)
  }

  fetchData(endpoint, params) {
    return this.handleRequest(this.generateRequest(endpoint, params))
  }
}