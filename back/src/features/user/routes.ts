import { Router } from 'express';
import { validators } from '../../middlewares/express-validator';
import { isLogged, isUserIdAccessible } from '../../middlewares/verify';

import { userHandles } from './handles';

export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route('/user/:userId')
  .get(
    validators.param('userId').notEmpty(),
    validators.handle,
    isLogged,
    isUserIdAccessible,
    userHandles.get_users_userId()
  )
  .put(
    validators.param('userId').notEmpty(),
    validators.handle,
    isLogged,
    isUserIdAccessible,
    userHandles.put_users_userId()
  );

router
  .route('/user/:userId/chatbotValidate')
  .post(
    validators.param('userId').notEmpty(),
    validators.body('code').notEmpty(),
    validators.handle,
    isLogged,
    userHandles.post_user_userId_chatbot_validate()
  );
