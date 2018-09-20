import ApiRouter from '../../../utilities/resources';

import TimelineBusinessService from './timeline.business';

const router = new ApiRouter();

export default router
.get('/', req => TimelineBusinessService.list(req.query))
.post('/', req => TimelineBusinessService.create(req.body))
.get('/:id', req => TimelineBusinessService.getById(req.params.id))
.put('/:id', req => TimelineBusinessService.update(req.params.id, req.body, req.user))
.delete('/:id', req => TimelineBusinessService.destroy(req.params.id))
.router();
