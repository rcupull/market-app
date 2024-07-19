import { Router } from 'express';
import { middlewareExpressValidator } from '../../middlewares/middlewareExpressValidator';

import { userHandles } from './handles';
import { middlewareIsLogged } from '../../middlewares/middlewareIsLogged';
import { middlewareIsUserIdAccessible } from '../../middlewares/middlewareIsUserIdAccessible';

export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route('/user/:userId')
  .get(
    middlewareExpressValidator.param('userId').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareIsUserIdAccessible,
    userHandles.get_users_userId(),
  )
  .put(
    middlewareExpressValidator.param('userId').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareIsUserIdAccessible,
    userHandles.put_users_userId(),
  );

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
router
  .route('/user/:userId/chatbotValidate')
  .post(
    middlewareExpressValidator.param('userId').notEmpty(),
    middlewareExpressValidator.body('code').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    userHandles.post_user_userId_chatbot_validate(),
  );

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
router
  .route('/user/:userId/checks')
  .put(
    middlewareExpressValidator.param('userId').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareIsUserIdAccessible,
    userHandles.put_user_userId_checks(),
  );
