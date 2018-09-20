export default Object.freeze({
  CONSTANT_1: 1,
  CONSTANT_2: 2,
  RIOT_API: {
    ENDPOINTS: {
      GET_SUMMONER_BY_NAME: "/lol/summoner/v3/summoners/by-name/",
      GET_SUMMONER_BY_ACCOUNT_ID: "/lol/summoner/v3/summoners/by-account/",
      GET_SUMMONER_BY_SUMMONER_ID: "/lol/summoner/v3/summoners/",
      GET_LEAGUE_BY_LEAGUE_ID: "/lol/league/v3/leagues/",
      GET_POSITION_BY_SUMMONER_ID: "/lol/league/v3/positions/by-summoner/",
      GET_MATCH_LIST_BY_ACCOUNT_ID: "/lol/match/v3/matchlists/by-account/",
      GET_MATCH_BY_GAME_ID: "/lol/match/v3/matches/",
      GET_TIMELINE_BY_GAME_ID: "/lol/match/v3/timelines/by-match/",
      GET_STATUS: "/lol/status/v3/shard-data",
      GET_CHAMPION_ROTATION: "/lol/platform/v3/champion-rotations",
    },
    DOMAIN: 'api.riotgames.com'
  }
});
