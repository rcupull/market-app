import { Router } from "express";
import { isAdmin, isLogged } from "../../middlewares/verify";

import { adminHandles } from "./handles";
import { validators } from "../../middlewares/express-validator";
import { pagination } from "../../middlewares/pagination";

export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route("/admin/users")
  .get(isLogged, isAdmin, pagination, adminHandles.get_users());

router
  .route("/admin/users/:userId")
  .delete(
    validators.param("userId").notEmpty(),
    validators.handle,
    isLogged,
    isAdmin,
    adminHandles.del_users_userId()
  );
