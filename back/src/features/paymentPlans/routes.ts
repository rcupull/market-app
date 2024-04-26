import { Router } from "express";

import { paymentPlansHandles } from "./handles";
import { validators } from "../../middlewares/express-validator";

export const router = Router();

router.route("/payment-plans").get(paymentPlansHandles.get_payment_plans());

router
  .route("/payment-plans/:type")
  .get(
    validators.param("type").notEmpty(),
    validators.handle,
    paymentPlansHandles.get_one_payment_plan()
  );
