import { Router } from 'express';

import { adminUsersHandles } from './handles';
import { middlewareExpressValidator } from '../../../middlewares/middlewareExpressValidator';
import { middlewarePagination } from '../../../middlewares/middlewarePagination';
import { middlewareIsLogged } from '../../../middlewares/middlewareIsLogged';
import { middlewareIsAdmin } from '../../../middlewares/middlewareIsAdmin';
import { middlewareHasAccess } from '../../../middlewares/middlewareHasAccess';
export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route('/users')
  .get(
    middlewareIsLogged,
    middlewareIsAdmin,
    middlewareHasAccess('user__read'),
    middlewarePagination,
    adminUsersHandles.get_users()
  );

router
  .route('/users/:userId')
  .delete(
    middlewareIsLogged,
    middlewareIsAdmin,
    middlewareExpressValidator.param('userId').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareHasAccess('user__remove'),
    adminUsersHandles.del_users_userId()
  );
//////////////////////////
router
  .route('/users/:userId/access')
  .put(
    middlewareIsLogged,
    middlewareIsAdmin,
    middlewareExpressValidator.param('userId').notEmpty(),
    middlewareExpressValidator.body('specialAccess').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareHasAccess('user_access__write'),
    adminUsersHandles.put_admin_users_userId_access()
  );

router
  .route('/access')
  .get(
    middlewareIsLogged,
    middlewareIsAdmin,
    middlewareHasAccess('access__read'),
    adminUsersHandles.get_admin_access()
  );
