import { RequestHandler } from "../../types/general";
import { withTryCatch } from "../../utils/error";
import { paymentPlans } from "../../constants/plans";
import { PaymentPlanType } from "../../types/general";

const get_payment_plans: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      res.send(paymentPlans);
    });
  };
};

const get_one_payment_plan: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const type = req.params.type as PaymentPlanType;
      res.send(paymentPlans[type]);
    });
  };
};

export const paymentPlansHandles = {
  get_payment_plans,
  get_one_payment_plan,
};
