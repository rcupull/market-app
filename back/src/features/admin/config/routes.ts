import { Router } from 'express';

import { adminConfigHandles } from './handles';
import { isAdmin, isLogged } from '../../../middlewares/verify';

export const router = Router();

router
  .route('/admin-config')
  .get(isLogged, isAdmin, adminConfigHandles.get_admin_admin_config())
  .put(isLogged, isAdmin, adminConfigHandles.put_admin_admin_config());
