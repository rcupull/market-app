import { Router } from 'express';

import { adminBusinessHandles } from './handles';
import { pagination } from '../../../middlewares/pagination';
import { hasAccess, isAdmin, isLogged } from '../../../middlewares/verify';
import { validators } from '../../../middlewares/express-validator';

export const router = Router();

router
  .route('/business')
  .get(
    isLogged,
    isAdmin,
    hasAccess('business__read'),
    pagination,
    adminBusinessHandles.get_admin_business(),
  );

router
  .route('/business/:routeName')
  .delete(
    isLogged,
    isAdmin,
    validators.param('routeName').notEmpty(),
    validators.handle,
    hasAccess('business__remove'),
    adminBusinessHandles.delete_admin_business_routeName(),
  );
