import { RequestHandler } from "../../types/general";
import { withTryCatch } from "../../utils/error";
import { ServerResponse } from "http";
import { v4 as uuid } from "uuid";
import { SessionModel, ValidationCodeModel } from "../../schemas/auth";
import { userServices } from "../user/services";
import {
  sendForgotPasswordCodeToEmail,
  sendValidationCodeToEmail,
} from "../email";
import { User } from "../../types/user";
import {
  get200Response,
  get201Response,
  get401Response,
  get404Response,
  getUserNotFoundResponse,
} from "../../utils/server-response";

const post_signIn: () => RequestHandler = () => {
  return (req, res, next) => {
    withTryCatch(req, res, async () => {
      const user = req.user as User;
      const { validated } = user;

      if (!validated) {
        return get401Response({
          res,
          json: { message: "The user is no validated" },
        });
      }
      //@ts-expect-error ignore
      const { password: ommited, ...userData } = user.toJSON();

      get200Response({
        res,
        json: { token: user.generateAccessJWT(), user: userData },
      });
    });
  };
};

const post_signOut: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { token } = req.body;

      const session = await SessionModel.findOne({ token });

      if (!session) {
        return get401Response({
          res,
          json: { message: "The session does not exist" },
        });
      }

      await SessionModel.deleteOne({ token });

      return get200Response({
        res,
        json: { message: "the session was closed successfully" },
      });
    });
  };
};

const post_signUp: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { email, password, name, canCreateBusiness } = req.body;

      const newUser = await userServices.addOne({
        email,
        name,
        password,
        canCreateBusiness,
        res,
        req,
      });

      if (newUser instanceof ServerResponse) return;

      // send validation code by email
      const code = uuid();

      await sendValidationCodeToEmail({ email, code });
      const newValidationCode = new ValidationCodeModel({
        code,
        userId: newUser._id,
      });
      await newValidationCode.save();

      get201Response({
        res,
        json: { message: "User registered successfully" },
      });
    });
  };
};

const post_validate: () => RequestHandler = () => {
  return async (req, res) => {
    withTryCatch(req, res, async () => {
      const { code } = req.body;

      const validationCode = await ValidationCodeModel.findOneAndDelete({
        code,
      });

      if (!validationCode) {
        return get404Response({
          res,
          json: {
            message:
              "Este codigo de validación no existe o ya el usuario fue validado",
          },
        });
      }

      const user = await userServices.findOneAndUpdate({
        res,
        req,
        query: { _id: validationCode.userId },
        update: { validated: true },
      });

      if (user instanceof ServerResponse) return user;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      get201Response({
        res,
        json: { message: "User validated successfully", email: user.email },
      });
    });
  };
};

const post_change_password: () => RequestHandler = () => {
  return (req, res, next) => {
    withTryCatch(req, res, async () => {
      const { user, body } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { newPassword } = body;

      user.password = newPassword;
      user.passwordVerbose = newPassword;

      //@ts-expect-error ignore
      await user.save();

      get200Response({
        res,
        json: { message: "password changed successfully" },
      });
    });
  };
};

const post_forgot_password_validate: () => RequestHandler = () => {
  return async (req, res) => {
    withTryCatch(req, res, async () => {
      const { code, newPassword } = req.body;

      const validationCode = await ValidationCodeModel.findOneAndDelete({
        code,
      });

      if (!validationCode) {
        return get404Response({
          res,
          json: {
            message:
              "Este codigo de validación no existe o ya la cuenta fue recuperada",
          },
        });
      }

      const user = await userServices.getOne({
        res,
        req,
        query: { _id: validationCode.userId },
      });

      if (user instanceof ServerResponse) return user;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      user.password = newPassword;
      user.passwordVerbose = newPassword;

      //@ts-expect-error ignore
      await user.save();

      get201Response({
        res,
        json: {
          message: "The password was changes successfully",
          email: user.email,
        },
      });
    });
  };
};

const post_forgot_password_request: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { email } = req.body;

      const user = await userServices.getOne({
        res,
        req,
        query: {
          email,
        },
      });

      if (user instanceof ServerResponse) return user;

      const code = uuid();

      await sendForgotPasswordCodeToEmail({ email, code });
      const newValidationCode = new ValidationCodeModel({
        code,
        userId: user._id,
      });
      await newValidationCode.save();

      get201Response({
        res,
        json: { message: "Forgot password request sent" },
      });
    });
  };
};

const put_firebase_token: () => RequestHandler = () => {
  return (req, res, next) => {
    withTryCatch(req, res, async () => {
      const { user, body } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { firebaseToken } = body;

      await userServices.updateOne({
        res,
        req,
        query: {
          _id: user._id,
        },
        update: {
          firebaseToken,
        },
      });

      get200Response({
        res,
        json: {},
      });
    });
  };
};

export const authHandles = {
  post_signIn,
  post_signOut,
  post_signUp,
  post_validate,
  post_change_password,
  post_forgot_password_request,
  post_forgot_password_validate,
  put_firebase_token,
};
