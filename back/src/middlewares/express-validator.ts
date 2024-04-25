import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  validationResult,
  query,
  param,
  body,
  header,
} from "express-validator";
import { AnyRecord } from "../types/general";
import { get422Response } from "../utils/server-response";

const handle: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let error: AnyRecord = {};
    errors.array().forEach((err) => {
      //@ts-expect-error ignore
      error[`${req.method} ${req.originalUrl} ${err.path}`] = err.msg;
    });
    return get422Response({
      res,
      json: {
        error,
      },
    });
  }
  next();
};

export const validators = {
  query,
  param,
  body,
  header,
  handle,
};
