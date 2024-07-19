import { Router } from 'express';

import { adminAgendaHandles } from './handles';
import { middlewareIsLogged } from '../../../middlewares/middlewareIsLogged';
import { middlewareIsAdmin } from '../../../middlewares/middlewareIsAdmin';
import { middlewareHasAccess } from '../../../middlewares/middlewareHasAccess';

export const router = Router();

router.use('/agenda/web/:token', adminAgendaHandles.use_admin_agenda_web());

router
  .route('/agenda/token')
  .get(
    middlewareIsLogged,
    middlewareIsAdmin,
    middlewareHasAccess('agenda__full'),
    adminAgendaHandles.get_admin_agenda_token(),
  );
