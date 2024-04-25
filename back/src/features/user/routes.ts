import { Router } from "express";
import { validators } from "../../middlewares/express-validator";
import { isLogged, isUserIdAccessible } from "../../middlewares/verify";

import { userHandles } from "./handles";

export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route("/user/:userId")
  .get(
    validators.param("userId").notEmpty(),
    validators.handle,
    isLogged,
    isUserIdAccessible,
    userHandles.get_users_userId()
  )
  .put(
    validators.param("userId").notEmpty(),
    validators.handle,
    isLogged,
    isUserIdAccessible,
    userHandles.put_users_userId()
  );

/////////////////////////////////////////////////////////////////

router
  .route("/user/:userId/payment/plan")
  .get(
    validators.param("userId").notEmpty(),
    validators.handle,
    isLogged,
    isUserIdAccessible,
    userHandles.get_users_userId_payment_plan()
  );

router
  .route("/user/:userId/payment/plan/purchase")
  .post(
    validators.param("userId").notEmpty(),
    validators.body("planType").notEmpty(),
    validators.body("validationPurchaseCode").notEmpty(),
    validators.handle,
    isLogged,
    isUserIdAccessible,
    userHandles.post_users_userId_payment_plan_purchase()
  );
