import { Request, RequestHandler, Send } from "express";
import { PaginationParameters } from "mongoose-paginate-v2";
import { AnyRecord } from "../types/general";
import { PaginateOptions } from "mongoose";

export interface PaginateResult<T> {
  data: T[];
  dataCount: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  page?: number | undefined;
  pageCount: number;
  offset: number;
  prevPage?: number | null | undefined;
  nextPage?: number | null | undefined;
  pagingCounter: number;
  paginator?: any;
  [customLabel: string]: T[] | number | boolean | null | undefined;
}

export const paginationCustomLabels: PaginateOptions["customLabels"] = {
  totalDocs: "dataCount",
  docs: "data",
  limit: "limit",
  page: "page",
  nextPage: "nextPage",
  prevPage: "prevPage",
  totalPages: "pageCount",
  pagingCounter: "pagingCounter",
  meta: "paginator",
};

export const pagination: RequestHandler = (req, res, next) => {
  // destructuring to see the query in swagger
  const { limit, page, offset, pagination } = req.query as PaginateOptions;

  const parameters = new PaginationParameters(req);

  let paginateOptions = parameters.getOptions();

  paginateOptions.customLabels = paginationCustomLabels;

  req.paginateOptions = paginateOptions;

  Object.keys(paginateOptions).forEach((key) => {
    if (key in req.query) {
      delete req.query[key];
    }
  });

  next();
};
