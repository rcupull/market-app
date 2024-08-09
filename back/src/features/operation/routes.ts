import { Router } from 'express';

import { operationHandles } from './handles';
import { middlewareIsLogged } from '../../middlewares/middlewareIsLogged';
import { middlewarePagination } from '../../middlewares/middlewarePagination';
import { middlewareIsPaymentClient } from '../../middlewares/middlewareIsPaymentClient';

export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route('/operations')
  .get(
    middlewareIsLogged,
    middlewareIsPaymentClient,
    middlewarePagination,
    operationHandles.get_operations()
  );
