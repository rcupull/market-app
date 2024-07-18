import { Router } from 'express';

import { adminBusinessHandles } from './handles';
import { middlewarePagination } from '../../../middlewares/middlewarePagination';
import { hasAccess, isAdmin, isLogged } from '../../../middlewares/verify';
import { middlewareExpressValidator } from '../../../middlewares/middlewareExpressValidator';

export const router = Router();

router
  .route('/business')
  .get(
    isLogged,
    isAdmin,
    hasAccess('business__read'),
    middlewarePagination,
    adminBusinessHandles.get_admin_business()
  );

router
  .route('/business/:routeName')
  .delete(
    isLogged,
    isAdmin,
    middlewareExpressValidator.param('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    hasAccess('business__remove'),
    adminBusinessHandles.delete_admin_business_routeName()
  );
