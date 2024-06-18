import { Router } from 'express';

import { adminBillsHandles } from './handles';
import { validators } from '../../../middlewares/express-validator';
import { pagination } from '../../../middlewares/pagination';
import { hasAccess, isAdmin, isLogged } from '../../../middlewares/verify';

export const router = Router();

router
  .route('/bills')
  .get(isLogged, isAdmin, hasAccess('full'), pagination, adminBillsHandles.get_admin_bills())
  .post(
    isLogged,
    isAdmin,
    validators.body('routeName').notEmpty(),
    validators.handle,
    hasAccess('full'),
    adminBillsHandles.post_admin_bills(),
  );

router
  .route('/bills/:billId/shopping')
  .delete(
    isLogged,
    isAdmin,
    validators.param('billId').notEmpty(),
    validators.body('shoppingIds').notEmpty(),
    validators.handle,
    hasAccess('full'),
    adminBillsHandles.del_admin_bills_billId_shopping(),
  );
