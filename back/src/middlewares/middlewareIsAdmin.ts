import { RequestHandler } from 'express';

import { get401Response } from '../utils/server-response';

export const middlewareIsAdmin: RequestHandler = (req, res, next) => {
  const { user } = req;

  if (user?.role == 'admin') return next();

  get401Response({ res, json: { message: 'The user is not an admin' } });
};
