import { Router } from 'express';
import { router as postRouter } from './features/post/routes';
import { router as userRouter } from './features/user/routes';
import { router as authRouter } from './features/auth/routes';
import { router as businessRouter } from './features/business/routes';
import { router as adminRouter } from './features/admin';
import { router as catalogsRouter } from './features/catalogs/routes';
import { router as imagesRouter } from './features/images/routes';
import { router as shoppingRouter } from './features/shopping/routes';
import { router as billingRouter } from './features/billing/routes';
import { router as geolocationRouter } from './features/geolocation/routes';
import { router as nlpRouter } from './features/nlp/routes';
import { router as reviewRouter } from './features/review/routes';
import { router as notificationsRouter } from './features/notifications/routes';

export const router = Router();

router.use(
  '/',
  authRouter,
  userRouter,
  postRouter,
  businessRouter,
  adminRouter,
  catalogsRouter,
  imagesRouter,
  shoppingRouter,
  billingRouter,
  geolocationRouter,
  nlpRouter,
  reviewRouter,
  notificationsRouter
);

export default router;
