import { Router } from 'express';

import { adminShoppingHandles } from './handles';
import { middlewarePagination } from '../../../middlewares/middlewarePagination';
import { middlewareIsLogged } from '../../../middlewares/middlewareIsLogged';
import { middlewareIsAdmin } from '../../../middlewares/middlewareIsAdmin';
import { middlewareHasAccess } from '../../../middlewares/middlewareHasAccess';

export const router = Router();

router
  .route('/shopping')
  .get(
    middlewareIsLogged,
    middlewareIsAdmin,
    middlewareHasAccess('shopping__read'),
    middlewarePagination,
    adminShoppingHandles.get_admin_shopping()
  );
