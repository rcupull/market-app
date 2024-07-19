import { RequestHandler } from 'express';

import { get401Response } from '../utils/server-response';

import { Access } from '../types/admin';

export const middlewareHasAccess =
  (...access: Array<Access>): RequestHandler =>
  (req, res, next) => {
    const { user } = req;

    const hasAccess = access.map((val) => user?.specialAccess?.includes(val)).some(Boolean);

    if (hasAccess || user?.specialAccess?.includes('full')) return next();

    get401Response({ res, json: { message: 'The user has not access to this data' } });
  };
