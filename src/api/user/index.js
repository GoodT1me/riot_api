import ApiRouter from '../../utilities/resources';

import UserBusinessService from './user.business';

const router = new ApiRouter();

export default router
  .get('/', req => UserBusinessService.list(req.query))
  .get('/:userId', req => UserBusinessService.getById(req.params.userId))
  .post(
    '/',
    req => UserBusinessService.create(req.body, req.user)
  )
  .put(
    '/:userId',
    req => UserBusinessService.update(req.user, req.params.userId, req.body),
  )
  .delete(
    '/:userId',
    req => UserBusinessService.destroy(req.params.userId),
  )
  .router();
