import { Router } from 'express';
import { middlewareExpressValidator } from '../../middlewares/middlewareExpressValidator';
import { isLogged, isUserIdAccessible } from '../../middlewares/verify';

import { userHandles } from './handles';

export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route('/user/:userId')
  .get(
    middlewareExpressValidator.param('userId').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    isUserIdAccessible,
    userHandles.get_users_userId()
  )
  .put(
    middlewareExpressValidator.param('userId').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    isUserIdAccessible,
    userHandles.put_users_userId()
  );

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

router
  .route('/user/:userId/favoriteBusiness')
  .post(
    middlewareExpressValidator.param('userId').notEmpty(),
    middlewareExpressValidator.body('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    isUserIdAccessible,
    userHandles.post_users_userId_favorite_business()
  )
  .delete(
    middlewareExpressValidator.param('userId').notEmpty(),
    middlewareExpressValidator.body('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    isLogged,
    isUserIdAccessible,
    userHandles.del_users_userId_favorite_business()
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
    isLogged,
    userHandles.post_user_userId_chatbot_validate()
  );
