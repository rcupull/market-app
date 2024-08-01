import { Router } from 'express';

import { middlewareExpressValidator } from '../../middlewares/middlewareExpressValidator';
import { authHandles } from './handles';
import { middlewareAutentication } from '../../middlewares/middlewarePassport';
import { middlewareIsLogged } from '../../middlewares/middlewareIsLogged';

export const router = Router();
/////////////////////////////////////////////////////////////////

router
  .route('/auth/sign-in')
  .post(
    middlewareExpressValidator.body('username').notEmpty(),
    middlewareExpressValidator.body('password').notEmpty(),
    middlewareExpressValidator.body('typeDevice').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareAutentication,
    authHandles.post_signIn(),
  );

router
  .route('/auth/refresh')
  .post(
    middlewareExpressValidator.body('refreshToken').notEmpty(),
    middlewareExpressValidator.handle,
    authHandles.post_refresh(),
  );
/////////////////////////////////////////////////////////////////

router
  .route('/auth/sign-out')
  .post(
    middlewareExpressValidator.body('refreshToken').notEmpty(),
    middlewareExpressValidator.handle,
    authHandles.post_signOut(),
  );
/////////////////////////////////////////////////////////////////

router
  .route('/auth/sign-up')
  .post(
    middlewareExpressValidator.body('email').notEmpty().isEmail(),
    middlewareExpressValidator.body('password').notEmpty(),
    middlewareExpressValidator.body('name').notEmpty(),
    middlewareExpressValidator.handle,
    authHandles.post_signUp(),
  );
/////////////////////////////////////////////////////////////////

router
  .route('/auth/validate')
  .post(
    middlewareExpressValidator.body('code').notEmpty(),
    middlewareExpressValidator.handle,
    authHandles.post_validate(),
  );

router
  .route('/auth/forgot-password-request')
  .post(
    middlewareExpressValidator.body('email').notEmpty(),
    middlewareExpressValidator.handle,
    authHandles.post_forgot_password_request(),
  );

router
  .route('/auth/forgot-password-validate')
  .post(
    middlewareExpressValidator.body('newPassword').notEmpty(),
    middlewareExpressValidator.body('code').notEmpty(),
    middlewareExpressValidator.handle,
    authHandles.post_forgot_password_validate(),
  );

router
  .route('/auth/change-password')
  .post(
    middlewareExpressValidator.body('newPassword').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    authHandles.post_change_password(),
  );

router
  .route('/auth/firebase/token')
  .put(
    middlewareExpressValidator.body('firebaseToken').notEmpty(),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    authHandles.put_firebase_token(),
  );
