import { Router } from 'express';

import { adminBillsHandles } from './handles';
import { middlewareExpressValidator } from '../../../middlewares/middlewareExpressValidator';
import { pagination } from '../../../middlewares/pagination';
import { hasAccess, isAdmin, isLogged } from '../../../middlewares/verify';

export const router = Router();

router
  .route('/bills')
  .get(isLogged, isAdmin, hasAccess('full'), pagination, adminBillsHandles.get_admin_bills())
  .post(
    isLogged,
    isAdmin,
    middlewareExpressValidator.body('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    hasAccess('bills__write'),
    adminBillsHandles.post_admin_bills()
  );

router
  .route('/bills/:billId')
  .delete(
    isLogged,
    isAdmin,
    middlewareExpressValidator.param('billId').notEmpty(),
    middlewareExpressValidator.handle,
    hasAccess('bills__remove'),
    adminBillsHandles.del_admin_bills_billId()
  );

router
  .route('/bills/:billId/shopping')
  .delete(
    isLogged,
    isAdmin,
    middlewareExpressValidator.param('billId').notEmpty(),
    middlewareExpressValidator.body('shoppingIds').notEmpty(),
    middlewareExpressValidator.handle,
    hasAccess('full'),
    adminBillsHandles.del_admin_bills_billId_shopping()
  );
