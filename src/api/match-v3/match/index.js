import ApiRouter from '../../../utilities/resources';

import MatchBusinessService from './match.business';

const router = new ApiRouter();

export default router
.get('/', req => MatchBusinessService.list(req.query))
.post('/', req => MatchBusinessService.create(req.body))
.get('/:id', req => MatchBusinessService.getById(req.params.id))
.put('/:id', req => MatchBusinessService.update(req.params.id, req.body, req.user))
.delete('/:id', req => MatchBusinessService.destroy(req.params.id))
.router();
