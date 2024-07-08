import { Router } from 'express';

import { reviewsHandles } from './handles';
import { pagination } from '../../middlewares/pagination';
import { isLogged } from '../../middlewares/verify';

export const router = Router();
/////////////////////////////////////////////////////////////////

router
  .route('/reviews')
  .get(pagination, reviewsHandles.get_reviews())
  .post(isLogged, reviewsHandles.post_reviews());

router.route('/reviews/summary').get(reviewsHandles.get_reviews_summary());
