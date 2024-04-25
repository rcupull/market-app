import { Response } from "express";
import { AnyRecord } from "../types/general";

export const getResponse = ({
  json,
  res,
  status,
}: {
  res: Response;
  status: 401 | 400 | 200 | 201 | 404 | 422 | 500;
  json: AnyRecord;
}) => {
  return res.status(status).json(json);
};

export const get401Response = ({
  json,
  res,
}: {
  res: Response;
  json: AnyRecord;
}) => {
  return getResponse({ res, status: 401, json });
};

export const get500Response = ({
  json,
  res,
}: {
  res: Response;
  json: AnyRecord;
}) => {
  return getResponse({ res, status: 500, json });
};

export const get422Response = ({
  json,
  res,
}: {
  res: Response;
  json: AnyRecord;
}) => {
  return getResponse({ res, status: 422, json });
};

export const get400Response = ({
  json,
  res,
}: {
  res: Response;
  json: AnyRecord;
}) => {
  return getResponse({ res, status: 400, json });
};

export const get404Response = ({
  json,
  res,
}: {
  res: Response;
  json: AnyRecord;
}) => {
  return getResponse({ res, status: 404, json });
};

export const get200Response = ({
  json,
  res,
}: {
  res: Response;
  json: AnyRecord;
}) => {
  return getResponse({ res, status: 200, json });
};

export const get201Response = ({
  json,
  res,
}: {
  res: Response;
  json: AnyRecord;
}) => {
  return getResponse({ res, status: 201, json });
};

export const getPostNotFoundResponse = ({ res }: { res: Response }) => {
  return get404Response({ res, json: { message: "Post not found" } });
};

export const getUserNotFoundResponse = ({ res }: { res: Response }) => {
  return get404Response({ res, json: { message: "User not found" } });
};

export const getBusinessNotFoundResponse = ({ res }: { res: Response }) => {
  return get404Response({ res, json: { message: "Business not found" } });
};
