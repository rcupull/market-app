import { Router } from 'express';
import { middlewareExpressValidator } from '../../middlewares/middlewareExpressValidator';

import { userHandles } from './handles';
import { middlewareIsLogged } from '../../middlewares/middlewareIsLogged';
import { middlewareIsUserIdAccessible } from '../../middlewares/middlewareIsUserIdAccessible';
import { middlewarePagination } from '../../middlewares/middlewarePagination';
import { middlewareUserCanCreateBusiness } from '../../middlewares/middlewareUserCanCreateBusiness';

export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route('/users/deliveryMan')
  .get(
    middlewareIsLogged,
    middlewareUserCanCreateBusiness,
    middlewarePagination,
    userHandles.get_users_delivery_man(),
  );

/////////////////////////////////////////////////////////////////

router
  .route('/users/:userId')
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
  .route('/users/:userId/chatbotValidate')
  .post(
    middlewareExpressValidator.param('userId').notEmpty(),
    middlewareExpressValidator.body('code').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    userHandles.post_users_userId_chatbot_validate(),
  );

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
router
  .route('/users/:userId/checks')
  .put(
    middlewareExpressValidator.param('userId').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    middlewareIsUserIdAccessible,
    userHandles.put_users_userId_checks(),
  );

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
router
  .route('/users/:userId/deliveryBusiness')
  .post(
    middlewareExpressValidator.param('userId').notEmpty(),
    middlewareExpressValidator.body('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    userHandles.post_users_userId_delivery_business(),
  )
  .delete(
    middlewareExpressValidator.param('userId').notEmpty(),
    middlewareExpressValidator.body('routeName').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    userHandles.del_users_userId_delivery_business(),
  );
