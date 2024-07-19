import { Router } from 'express';

import { middlewarePagination } from '../../middlewares/middlewarePagination';
import { middlewareExpressValidator } from '../../middlewares/middlewareExpressValidator';
import { billingHandles } from './handles';
import { middlewareIsLogged } from '../../middlewares/middlewareIsLogged';
import { middlewareIsUserBusinessOwner } from '../../middlewares/middlewareIsUserBusinessOwner';
import { middlewareIsUserThisBusinessOwner } from '../../middlewares/middlewareIsUserThisBusinessOwner';

export const router = Router();

router
  .route('/bills')
  .get(
    middlewareExpressValidator.query('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareIsUserBusinessOwner,
    middlewareIsUserThisBusinessOwner,
    middlewarePagination,
    billingHandles.get_bills()
  );
