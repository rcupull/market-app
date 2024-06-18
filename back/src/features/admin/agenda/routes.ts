import { Router } from 'express';

import { adminAgendaHandles } from './handles';
import { hasAccess, isAdmin, isLogged } from '../../../middlewares/verify';

export const router = Router();

router.use('/agenda/web/:token', adminAgendaHandles.use_admin_agenda_web());

router
  .route('/agenda/token')
  .get(isLogged, isAdmin, hasAccess('agenda__full'), adminAgendaHandles.get_admin_agenda_token());
