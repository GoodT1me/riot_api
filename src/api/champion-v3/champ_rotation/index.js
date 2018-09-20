import ApiRouter from '../../../utilities/resources';

import ChampRotationBusinessService from './champ_rotation.business';

const router = new ApiRouter();

export default router
.get('/', req => ChampRotationBusinessService.list(req.query))
.post('/', req => ChampRotationBusinessService.create(req.body))
.get('/:id', req => ChampRotationBusinessService.getById(req.params.id))
.put('/:id', req => ChampRotationBusinessService.update(req.params.id, req.body, req.user))
.delete('/:id', req => ChampRotationBusinessService.destroy(req.params.id))
.router();
