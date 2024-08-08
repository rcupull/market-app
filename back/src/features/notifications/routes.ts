import { Router } from 'express';

import { middlewareIsLogged } from '../../middlewares/middlewareIsLogged';
import { notificationsHandles } from './handles';
import { middlewareExpressValidator } from '../../middlewares/middlewareExpressValidator';

export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route('/notifications/:notificationId/read')
  .put(
    middlewareExpressValidator.param('notificationId').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    notificationsHandles.puts_notifications_notificationId_read()
  );
