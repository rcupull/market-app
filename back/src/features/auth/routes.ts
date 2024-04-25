import { Router } from "express";

import { validators } from "../../middlewares/express-validator";
import { authHandles } from "./handles";
import { passportLocalMiddleware } from "../../middlewares/passport";
import { isLogged } from "../../middlewares/verify";

export const router = Router();
/////////////////////////////////////////////////////////////////

router
  .route("/auth/sign-in")
  .post(
    validators.body("username").notEmpty(),
    validators.body("password").notEmpty(),
    validators.handle,
    passportLocalMiddleware,
    authHandles.post_signIn()
  );
/////////////////////////////////////////////////////////////////

router
  .route("/auth/sign-out")
  .post(
    validators.body("token").notEmpty(),
    validators.handle,
    authHandles.post_signOut()
  );
/////////////////////////////////////////////////////////////////

router
  .route("/auth/sign-up")
  .post(
    validators.body("email").notEmpty().isEmail(),
    validators.body("password").notEmpty(),
    validators.body("name").notEmpty(),
    validators.body("canCreateBusiness").notEmpty(),
    validators.handle,
    authHandles.post_signUp()
  );
/////////////////////////////////////////////////////////////////

router
  .route("/auth/validate")
  .post(
    validators.body("code").notEmpty(),
    validators.handle,
    authHandles.post_validate()
  );

router
  .route("/auth/forgot-password-request")
  .post(
    validators.body("email").notEmpty(),
    validators.handle,
    authHandles.post_forgot_password_request()
  );

router
  .route("/auth/forgot-password-validate")
  .post(
    validators.body("newPassword").notEmpty(),
    validators.body("code").notEmpty(),
    validators.handle,
    authHandles.post_forgot_password_validate()
  );

router
  .route("/auth/change-password")
  .post(
    validators.body("newPassword").notEmpty(),
    validators.handle,
    isLogged,
    authHandles.post_change_password()
  );

router
  .route("/auth/firebase/token")
  .put(
    validators.body("firebaseToken").notEmpty(),
    validators.handle,
    isLogged,
    authHandles.put_firebase_token()
  );
