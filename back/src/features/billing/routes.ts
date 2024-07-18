import { Router } from 'express';

import { middlewarePagination } from '../../middlewares/middlewarePagination';
import { middlewareExpressValidator } from '../../middlewares/middlewareExpressValidator';
import { billingHandles } from './handles';
import { isLogged, isUserBusinessOwner, isUserThisBusinessOwner } from '../../middlewares/verify';

export const router = Router();

router
  .route('/bills')
  .get(
    middlewareExpressValidator.query('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    isUserBusinessOwner,
    isUserThisBusinessOwner,
    middlewarePagination,
    billingHandles.get_bills()
  );
