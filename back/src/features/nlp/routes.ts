import { Router } from 'express';

import { nlpHandles } from './handles';
import { middlewareIsLogged } from '../../middlewares/middlewareIsLogged';
import { middlewareIsAdmin } from '../../middlewares/middlewareIsAdmin';
import { middlewareHasAccess } from '../../middlewares/middlewareHasAccess';

export const router = Router();

router
  .route('/nlp/train')
  .post(
    middlewareIsLogged,
    middlewareIsAdmin,
    middlewareHasAccess('full'),
    nlpHandles.post_nlp_train(),
  );

router
  .route('/nlp/search')
  .get(
    middlewareIsLogged,
    middlewareIsAdmin,
    middlewareHasAccess('full'),
    nlpHandles.get_nlp_search(),
  );
