import { Request, RequestHandler } from "express";
import { withTryCatch } from "../utils/error";
import { User } from "../types/user";
import { AnyRecord } from "../types/general";
import { ServerResponse } from "http";
import { postServices } from "../features/post/services";
import { isEqualIds } from "../utils/general";
import { passportJwtMiddleware } from "./passport";
import {
  get401Response,
  get404Response,
  getUserNotFoundResponse,
} from "../utils/server-response";
import { businessServices } from "../features/business/services";

export const isLogged = passportJwtMiddleware;

const getFieldInReqData = (req: Request, field: string) => {
  return req.body[field] || req.query[field] || req.params[field];
};

export const isAdmin: RequestHandler = (req, res, next) => {
  const user = req.user;

  if (user?.role == "admin") return next();

  get401Response({ res, json: { message: "The user is not an admin" } });
};

export const isUserIdAccessible: RequestHandler = (req, res, next) => {
  const { user } = req;

  if (!user) {
    return getUserNotFoundResponse({ res });
  }

  const { userId } = req.params;

  if (!userId) {
    return get404Response({
      res,
      json: { message: "UserId not found" },
    });
  }

  if (user._id.toString() === userId) return next();

  get401Response({
    res,
    json: { message: "The user has not access to this data" },
  });
};

export const isUserBusinessOwner: RequestHandler = async (req, res, next) => {
  const { user } = req;

  if (!user) {
    return get404Response({
      res,
      json: { message: "user not found" },
    });
  }

  if (user.canCreateBusiness) {
    return next();
  }

  return get401Response({
    res,
    json: { message: "The user is not business owner" },
  });
};

export const isUserThisBusinessOwner: RequestHandler = async (
  req,
  res,
  next
) => {
  const { user } = req;
  const routeName = getFieldInReqData(req, "routeName");

  if (!user) {
    return get404Response({
      res,
      json: { message: "user not found" },
    });
  }

  if (!routeName) {
    return get404Response({
      res,
      json: { message: "routeName not found" },
    });
  }

  const business = await businessServices.findOne({
    res,
    req,
    query: {
      routeName,
    },
  });

  if (business instanceof ServerResponse) return business;

  if (user._id.toString() === business.createdBy.toString()) {
    req["business"] = business;
    return next();
  }

  get401Response({
    res,
    json: { message: "The user has not access to this business" },
  });
};

export const getBusinessMiddleware: RequestHandler = async (req, res, next) => {
  /**
   * put the business in the req if exists routeName
   */

  if (req.business) {
    return next();
  }

  const routeName = getFieldInReqData(req, "routeName");

  if (!routeName) {
    return next();
  }

  const business = await businessServices.findOne({
    res,
    req,
    query: {
      routeName,
    },
  });

  if (business instanceof ServerResponse) return next();

  req["business"] = business;
  return next();
};

export const isUserThisPostOwner: RequestHandler = async (req, res, next) => {
  const { user } = req;

  if (!user) {
    return getUserNotFoundResponse({ res });
  }

  const postId = req.params.postId;

  if (!postId) {
    return get404Response({
      res,
      json: { message: "routeName not found" },
    });
  }

  const post = await postServices.getOne({
    res,
    req,
    postId,
  });

  if (post instanceof ServerResponse) return post;

  if (user._id.toString() === post.createdBy.toString()) {
    req.post = post;
    return next();
  }

  get401Response({
    res,
    json: { message: "The user has not access to this post" },
  });
};

export const addPostToReq: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId || req.body.postId;

  if (!postId) {
    return next();
  }

  const post = await postServices.getOne({
    res,
    req,
    postId,
  });

  if (post instanceof ServerResponse) return post;

  req.post = post;
  return next();
};

export type RequestWithUser<
  P = AnyRecord,
  ResBody = any,
  ReqBody = any,
  ReqQuery = AnyRecord,
  Locals extends Record<string, any> = Record<string, any>
> = Request<P, ResBody, ReqBody, ReqQuery, Locals> & {
  user: User;
};

export const verifyPost: RequestHandler = (req, res, next) => {
  withTryCatch(req, res, async () => {
    const { user } = req;

    if (!user) {
      return getUserNotFoundResponse({ res });
    }

    if (!user) {
      return res
        .sendStatus(404)
        .json({ message: "We should have some value in user in this point" });
    }

    const postId = req.params.postId as string | undefined;

    if (!postId) {
      return res
        .sendStatus(404)
        .json({ message: "We should have some value in postId in this point" });
    }

    const out = await postServices.getOne({
      res,
      req,
      postId,
    });

    if (out instanceof ServerResponse) return out;

    const { createdBy } = out;

    if (!isEqualIds(createdBy, user._id)) {
      return res
        .sendStatus(401)
        .json({ message: "Have not access to this post" });
    }

    next();
  });
};

// export const getVerifyRole =
//   (roleToCheck: UserRole): RequestHandler =>
//   (req, res, next) => {
//     withTryCatch(req, res, async () => {
//       //@ts-expect-error
//       const user = req.user as User; // we have access to the user object from the request

//       const { role } = user; // extract the user role
//       // check if user has no advance privileges
//       // return an unathorized response
//       if (role !== roleToCheck) {
//         return res.status(401).json({
//           message: "Wrong role. You are not authorized to do this action.",
//         });
//       }
//       next();
//     });
//   };
