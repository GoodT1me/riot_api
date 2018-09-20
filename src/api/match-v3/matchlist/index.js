import ApiRouter from '../../../utilities/resources';

import MatchlistBusinessService from './matchlist.business';

const router = new ApiRouter();

export default router
.get('/', req => MatchlistBusinessService.list(req.query))
.post('/', req => MatchlistBusinessService.create(req.body))
.get('/:id', req => MatchlistBusinessService.getById(req.params.id))
.put('/:id', req => MatchlistBusinessService.update(req.params.id, req.body, req.user))
.delete('/:id', req => MatchlistBusinessService.destroy(req.params.id))
.router();
