import { Router } from 'express';

import { pagination } from '../../middlewares/pagination';
import { validators } from '../../middlewares/express-validator';
import { billingHandles } from './handles';
import { isLogged, isUserBusinessOwner, isUserThisBusinessOwner } from '../../middlewares/verify';

export const router = Router();

router
  .route('/bills')
  .get(
    validators.query('routeName').notEmpty(),
    validators.handle,
    isLogged,
    isUserBusinessOwner,
    isUserThisBusinessOwner,
    pagination,
    billingHandles.get_bills(),
  );
