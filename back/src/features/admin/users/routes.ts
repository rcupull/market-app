import { Router } from 'express';

import { adminUsersHandles } from './handles';
import { hasAccess, isAdmin, isLogged } from '../../../middlewares/verify';
import { validators } from '../../../middlewares/express-validator';
import { pagination } from '../../../middlewares/pagination';
export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route('/users')
  .get(isLogged, isAdmin, hasAccess('user__read'), pagination, adminUsersHandles.get_users());

router
  .route('/users/:userId')
  .delete(
    isLogged,
    isAdmin,
    validators.param('userId').notEmpty(),
    validators.handle,
    hasAccess('user__remove'),
    adminUsersHandles.del_users_userId()
  );
//////////////////////////
router
  .route('/users/:userId/access')
  .put(
    isLogged,
    isAdmin,
    validators.param('userId').notEmpty(),
    validators.body('specialAccess').notEmpty(),
    validators.handle,
    hasAccess('user_access__write'),
    adminUsersHandles.put_admin_users_userId_access()
  );

router
  .route('/access')
  .get(isLogged, isAdmin, hasAccess('access__read'), adminUsersHandles.get_admin_access());
