import { Router } from 'express';

import { adminShoppingHandles } from './handles';
import { hasAccess, isAdmin, isLogged } from '../../../middlewares/verify';
import { middlewarePagination } from '../../../middlewares/middlewarePagination';

export const router = Router();

router
  .route('/shopping')
  .get(
    isLogged,
    isAdmin,
    hasAccess('shopping__read'),
    middlewarePagination,
    adminShoppingHandles.get_admin_shopping()
  );
