import ApiRouter from '../../utilities/resources';

import SummonerBusinessService from './summoner.business';

const router = new ApiRouter();

export default router
.get('/', req => SummonerBusinessService.list(req.params.region, req.query))
.get('/summoner-id/:summonerId', req => SummonerBusinessService.getBySummonerId(req.params.region, req.params.summonerId))
.get('/summoner-name/:summonerName', req => SummonerBusinessService.getBySummonerName(req.params.region, req.params.summonerName))
.get('/account-id/:accountId', req => SummonerBusinessService.getByAccountId(req.params.accountId))
.post('/', req => SummonerBusinessService.create(req.body))
// .put('/:summonerId', req => SummonerBusinessService.update(req.params.summonerId, req.body, req.user))
.delete('/summoner-id/:summonerId', req => SummonerBusinessService.destroyBySummonerId(req.params.summonerId))
.delete('/summoner-name/:summonerName', req => SummonerBusinessService.destroyBySummonerName(req.params.summonerName))
.delete('/account-id/:accountId', req => SummonerBusinessService.getWhereClauseByAccountId(req.params.accountId))
.router();
