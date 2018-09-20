import ApiRouter from '../../../utilities/resources';

import PositionBusinessService from './position.business';

const router = new ApiRouter();

export default router
.get('/', req => PositionBusinessService.list(req.query))
.post('/', req => PositionBusinessService.create(req.body))
.get('/:summonerId', req => PositionBusinessService.getById(req.params.summonerId))
.put('/:summonerId', req => PositionBusinessService.update(req.params.summonerId, req.body, req.user))
.delete('/:summonerId', req => PositionBusinessService.destroy(req.params.summonerId))
.router();
