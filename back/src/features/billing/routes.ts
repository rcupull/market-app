import { Router } from 'express';

import { middlewarePagination } from '../../middlewares/middlewarePagination';
import { middlewareExpressValidator } from '../../middlewares/middlewareExpressValidator';
import { billingHandles } from './handles';
import { middlewareIsLogged } from '../../middlewares/middlewareIsLogged';
import { middlewareUserCanCreateBusiness } from '../../middlewares/middlewareUserCanCreateBusiness';
import { middlewareBusinessManIsOwnerOfThis } from '../../middlewares/middlewareBusinessManIsOwnerOfThis';

export const router = Router();

router
  .route('/bills')
  .get(
    middlewareExpressValidator.query('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareUserCanCreateBusiness,
    middlewareBusinessManIsOwnerOfThis,
    middlewarePagination,
    billingHandles.get_bills()
  );
