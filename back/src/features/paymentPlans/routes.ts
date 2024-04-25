import { Router } from "express";

import { paymentPlansHandles } from "./handles";
import { validators } from "../../middlewares/express-validator";

export const router = Router();

router.route("/paymentPlans").get(paymentPlansHandles.get_payment_plans());

router
  .route("/paymentPlans/:type")
  .get(
    validators.param("type").notEmpty(),
    validators.handle,
    paymentPlansHandles.get_one_payment_plan()
  );
