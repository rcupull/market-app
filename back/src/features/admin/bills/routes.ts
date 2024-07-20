import { Router } from 'express';

import { adminBillsHandles } from './handles';
import { middlewareExpressValidator } from '../../../middlewares/middlewareExpressValidator';
import { middlewarePagination } from '../../../middlewares/middlewarePagination';
import { middlewareIsLogged } from '../../../middlewares/middlewareIsLogged';
import { middlewareIsAdmin } from '../../../middlewares/middlewareIsAdmin';
import { middlewareHasAccess } from '../../../middlewares/middlewareHasAccess';

export const router = Router();

router
  .route('/bills')
  .get(
    middlewareIsLogged,
    middlewareIsAdmin,
    middlewareHasAccess('full'),
    middlewarePagination,
    adminBillsHandles.get_admin_bills()
  )
  .post(
    middlewareIsLogged,
    middlewareIsAdmin,
    middlewareExpressValidator.body('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareHasAccess('bills__write'),
    adminBillsHandles.post_admin_bills()
  );

router
  .route('/bills/:billId')
  .delete(
    middlewareIsLogged,
    middlewareIsAdmin,
    middlewareExpressValidator.param('billId').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareHasAccess('bills__remove'),
    adminBillsHandles.del_admin_bills_billId()
  );

router
  .route('/bills/:billId/shopping')
  .delete(
    middlewareIsLogged,
    middlewareIsAdmin,
    middlewareExpressValidator.param('billId').notEmpty(),
    middlewareExpressValidator.body('shoppingIds').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareHasAccess('full'),
    adminBillsHandles.del_admin_bills_billId_shopping()
  );
