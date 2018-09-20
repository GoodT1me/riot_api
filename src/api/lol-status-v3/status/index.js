import ApiRouter from '../../../utilities/resources';

import StatusBusinessService from './status.business';

const router = new ApiRouter();

export default router
.get('/', req => StatusBusinessService.list(req.query))
.post('/', req => StatusBusinessService.create(req.body))
.get('/:id', req => StatusBusinessService.getById(req.params.id))
.put('/:id', req => StatusBusinessService.update(req.params.id, req.body, req.user))
.delete('/:id', req => StatusBusinessService.destroy(req.params.id))
.router();
