import ApiRouter from '../../utilities/resources';

import ProductBusinessService from './product.business';

const router = new ApiRouter();

export default router
.get('/', req => ProductBusinessService.list(req.query))
.post('/', req => ProductBusinessService.create(req.body))
.get('/:summonerId', req => ProductBusinessService.getById(req.params.summonerId))
.put('/:summonerId', req => ProductBusinessService.update(req.params.summonerId, req.body, req.user))
.delete('/:summonerId', req => ProductBusinessService.destroy(req.params.summonerId))
.router();
