import { Router } from "express";
import { validators } from "../../middlewares/express-validator";
import { isLogged } from "../../middlewares/verify";
import { imageHandles } from "./handles";

export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route("/images")
  .post(validators.handle, isLogged, imageHandles.save_image());

/////////////////////////////////////////////////////////////////
