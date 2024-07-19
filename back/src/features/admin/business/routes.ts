import { Router } from 'express';

import { adminBusinessHandles } from './handles';
import { middlewarePagination } from '../../../middlewares/middlewarePagination';
import { middlewareExpressValidator } from '../../../middlewares/middlewareExpressValidator';
import { middlewareIsLogged } from '../../../middlewares/middlewareIsLogged';
import { middlewareIsAdmin } from '../../../middlewares/middlewareIsAdmin';
import { middlewareHasAccess } from '../../../middlewares/middlewareHasAccess';

export const router = Router();

router
  .route('/business')
  .get(
    middlewareIsLogged,
    middlewareIsAdmin,
    middlewareHasAccess('business__read'),
    middlewarePagination,
    adminBusinessHandles.get_admin_business(),
  );

router
  .route('/business/:routeName')
  .delete(
    middlewareIsLogged,
    middlewareIsAdmin,
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareHasAccess('business__remove'),
    adminBusinessHandles.delete_admin_business_routeName(),
  );
