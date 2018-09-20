import ApiRouter from '../../utilities/resources';

import LanguageBusinessService from './language.business';

const router = new ApiRouter();

export default router
  .get('/', req => LanguageBusinessService.list(req.query))
  .post('/', req => LanguageBusinessService.create(req.body))
  .get('/:languageId', req => LanguageBusinessService.getById(req.params.languageId))
  // .get('/:code', req => LanguageBusinessService.getByCode(req.params.code))
  .put('/:languageId', req => LanguageBusinessService.update(req.params.languageId, req.body, req.user))
  .delete('/:languageId', req => LanguageBusinessService.destroy(req.params.languageId))
  .router();
