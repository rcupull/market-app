import { Router } from 'express';

import { adminShoppingHandles } from './handles';
import { hasAccess, isAdmin, isLogged } from '../../../middlewares/verify';
import { pagination } from '../../../middlewares/pagination';

export const router = Router();

router
  .route('/shopping')
  .get(
    isLogged,
    isAdmin,
    hasAccess('shopping__read'),
    pagination,
    adminShoppingHandles.get_admin_shopping()
  );
