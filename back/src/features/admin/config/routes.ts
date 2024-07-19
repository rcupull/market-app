import { Router } from 'express';

import { adminConfigHandles } from './handles';
import { middlewareIsLogged } from '../../../middlewares/middlewareIsLogged';
import { middlewareIsAdmin } from '../../../middlewares/middlewareIsAdmin';

export const router = Router();

router
  .route('/admin-config')
  .get(adminConfigHandles.get_admin_admin_config())
  .put(middlewareIsLogged, middlewareIsAdmin, adminConfigHandles.put_admin_admin_config());
