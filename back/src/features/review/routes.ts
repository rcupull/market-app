import { Router } from 'express';

import { reviewsHandles } from './handles';
import { middlewarePagination } from '../../middlewares/middlewarePagination';
import { middlewareIsLogged } from '../../middlewares/middlewareIsLogged';

export const router = Router();
/////////////////////////////////////////////////////////////////

router
  .route('/reviews')
  .get(middlewarePagination, reviewsHandles.get_reviews())
  .post(middlewareIsLogged, reviewsHandles.post_reviews());

router.route('/reviews/summary').get(reviewsHandles.get_reviews_summary());
