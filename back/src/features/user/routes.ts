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
