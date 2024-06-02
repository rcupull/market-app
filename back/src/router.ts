import { Router } from 'express';
import { router as postRouter } from './features/post/routes';
import { router as userRouter } from './features/user/routes';
import { router as authRouter } from './features/auth/routes';
import { router as businessRouter } from './features/business/routes';
import { router as adminRouter } from './features/admin/routes';
import { router as catalogsRouter } from './features/catalogs/routes';
import { router as imagesRouter } from './features/images/routes';
import { router as shoppingRouter } from './features/shopping/routes';
import { router as generalRouter } from './features/general/routes';

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
  generalRouter,
);

export default router;
