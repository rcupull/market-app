import { Router } from 'express';

import { adminUsersHandles } from './handles';
import { hasAccess, isAdmin, isLogged } from '../../../middlewares/verify';
import { middlewareExpressValidator } from '../../../middlewares/middlewareExpressValidator';
import { middlewarePagination } from '../../../middlewares/middlewarePagination';
export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route('/users')
  .get(
    isLogged,
    isAdmin,
    hasAccess('user__read'),
    middlewarePagination,
    adminUsersHandles.get_users()
  );

router
  .route('/users/:userId')
  .delete(
    isLogged,
    isAdmin,
    middlewareExpressValidator.param('userId').notEmpty(),
    middlewareExpressValidator.handle,
    hasAccess('user__remove'),
    adminUsersHandles.del_users_userId()
  );
//////////////////////////
router
  .route('/users/:userId/access')
  .put(
    isLogged,
    isAdmin,
    middlewareExpressValidator.param('userId').notEmpty(),
    middlewareExpressValidator.body('specialAccess').notEmpty(),
    middlewareExpressValidator.handle,
    hasAccess('user_access__write'),
    adminUsersHandles.put_admin_users_userId_access()
  );

router
  .route('/access')
  .get(isLogged, isAdmin, hasAccess('access__read'), adminUsersHandles.get_admin_access());
