import { Router } from 'express';
import { hasAccess, isAdmin, isLogged } from '../../middlewares/verify';

import { adminHandles } from './handles';
import { validators } from '../../middlewares/express-validator';
import { pagination } from '../../middlewares/pagination';

export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route('/admin/users')
  .get(isLogged, isAdmin, hasAccess('user__read'), pagination, adminHandles.get_users());

router
  .route('/admin/users/:userId')
  .delete(
    validators.param('userId').notEmpty(),
    validators.handle,
    isLogged,
    isAdmin,
    hasAccess('user__remove'),
    adminHandles.del_users_userId()
  );

router
  .route('/admin/admin-config')
  .get(adminHandles.get_admin_admin_config())
  .put(isLogged, isAdmin, adminHandles.put_admin_admin_config());

/////////////////////////////////////////////////////////////////
router
  .route('/admin/users/:userId/access')
  .put(
    validators.param('userId').notEmpty(),
    validators.body('specialAccess').notEmpty(),
    validators.handle,
    isLogged,
    isAdmin,
    hasAccess('user_access__write'),
    adminHandles.put_admin_users_userId_access()
  );

router
  .route('/admin/access')
  .get(isLogged, isAdmin, hasAccess('access__read'), adminHandles.get_admin_access());

router
  .route('/admin/shopping')
  .get(
    isLogged,
    isAdmin,
    hasAccess('shopping__read'),
    pagination,
    adminHandles.get_admin_shopping()
  );
///////////////////////////////////////////////////////////////
router
  .route('/admin/bills')
  .get(isLogged, isAdmin, hasAccess('full'), pagination, adminHandles.get_admin_bills())
  .post(
    validators.body('routeName').notEmpty(),
    validators.body('shoppingIds').notEmpty(),
    validators.handle,
    isLogged,
    hasAccess('full'),
    adminHandles.post_admin_bills()
  );

router
  .route('/admin/bills/:billId/shopping')
  .delete(
    validators.param('billId').notEmpty(),
    validators.body('shoppingIds').notEmpty(),
    validators.handle,
    isLogged,
    hasAccess('full'),
    adminHandles.del_admin_bills_billId_shopping()
  );
