import ApiRouter from '../../../utilities/resources';

import LeagueBusinessService from './league.business';

const router = new ApiRouter();

export default router
.get('/', req => LeagueBusinessService.list(req.query))
.post('/', req => LeagueBusinessService.create(req.body))
.get('/:summonerId', req => LeagueBusinessService.getById(req.params.summonerId))
.put('/:summonerId', req => LeagueBusinessService.update(req.params.summonerId, req.body, req.user))
.delete('/:summonerId', req => LeagueBusinessService.destroy(req.params.summonerId))
.router();
