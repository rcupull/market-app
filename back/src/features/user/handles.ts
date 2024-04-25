import { RequestHandler } from "../../types/general";
import { withTryCatch } from "../../utils/error";
import { ServerResponse } from "http";
import { RequestWithUser } from "../../middlewares/verify";
import { paymentPlans } from "../../constants/plans";
import { imagesServices } from "../images/services";
import { userServices } from "./services";
import { User } from "../../types/user";
import { UserModel } from "../../schemas/user";

const get_users_userId: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params } = req;

      const { userId } = params;

      const out = await userServices.getOne({
        res,
        req,
        query: {
          _id: userId,
        },
      });

      if (out instanceof ServerResponse) return;

      res.send(out);
    });
  };
};

const put_users_userId: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params, body } = req;

      const { userId } = params;

      const { profileImage } = body as User;

      /**
       * Delete old profile image
       */
      if (profileImage) {
        const currentUser = await userServices.getOne({
          query: {
            _id: userId,
          },
          res,
          req,
        });

        if (currentUser instanceof ServerResponse) return currentUser;

        if (currentUser.profileImage) {
          await imagesServices.deleteOldImages({
            res,
            req,
            newImagesSrcs: [profileImage],
            oldImagesSrcs: [currentUser.profileImage],
          });
        }
      }

      /**
       * Update
       */
      const out = await userServices.updateOne({
        res,
        req,
        query: {
          _id: userId,
        },
        update: body,
      });

      if (out instanceof ServerResponse) return out;

      res.send(out);
    });
  };
};

/**
 *  //////////////////////////////////////////POSTS
 */

const get_users_userId_payment_plan: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { user } = req as RequestWithUser;
      const planHistory = user.payment.planHistory;
      const { planType } = planHistory[planHistory.length - 1] || {}; // always the last plan is the curent
      const currentPlan = paymentPlans[planType];

      res.send(currentPlan);
    });
  };
};
const post_users_userId_payment_plan_purchase: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { user, body } = req as RequestWithUser;
      const { planType, validationPurchaseCode } = body;

      await UserModel.updateOne(
        { _id: user._id },
        {
          $push: {
            "payment.planHistory": [
              {
                planType,
                dateOfPurchase: new Date(),
                trialMode: false,
                status: "validatingPurchase",
                validationPurchaseCode,
              },
            ],
          },
        }
      );

      res.send({});
    });
  };
};

export const userHandles = {
  get_users_userId,
  put_users_userId,
  //
  get_users_userId_payment_plan,
  post_users_userId_payment_plan_purchase,
};
