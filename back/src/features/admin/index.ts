import { Router } from 'express';
import { router as agendaRouter } from './agenda/routes';
import { router as configRouter } from './config/routes';
import { router as shoppingRouter } from './shopping/routes';
import { router as businessRouter } from './business/routes';
import { router as usersRouter } from './users/routes';
import { router as billsRouter } from './bills/routes';
import { isAdmin, isLogged } from '../../middlewares/verify';

export const router = Router();

router.use(
  '/admin',
  configRouter,
  shoppingRouter,
  businessRouter,
  usersRouter,
  billsRouter,
  agendaRouter,
);
