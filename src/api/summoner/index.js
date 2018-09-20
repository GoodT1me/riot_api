import ApiRouter from '../../utilities/resources';

import LolBusinessService from './summoner.business';

const router = new ApiRouter();

export default router
.get('/', req => LolBusinessService.list(req.query))
.get('/summoner-id/:summonerId', req => LolBusinessService.getBySummonerId(req.params.summonerId))
.get('/summoner-name/:summonerName', req => LolBusinessService.getBySummonerName(req.params.summonerName))
.get('/account-id/:accountId', req => LolBusinessService.getByAccountId(req.params.accountId))
.post('/', req => LolBusinessService.create(req.body))
// .put('/:summonerId', req => LolBusinessService.update(req.params.summonerId, req.body, req.user))
.delete('/summoner-id/:summonerId', req => LolBusinessService.destroyBySummonerId(req.params.summonerId))
.delete('/summoner-name/:summonerName', req => LolBusinessService.destroyBySummonerName(req.params.summonerName))
.delete('/account-id/:accountId', req => LolBusinessService.getWhereClauseByAccountId(req.params.accountId))
.router();
