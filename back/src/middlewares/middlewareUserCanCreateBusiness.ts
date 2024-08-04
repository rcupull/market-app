import { RequestHandler } from 'express';

import { get401Response, get404Response } from '../utils/server-response';

export const middlewareUserCanCreateBusiness: RequestHandler = async (req, res, next) => {
  const { user } = req;

  if (!user) {
    return get404Response({
      res,
      json: { message: 'user not found' }
    });
  }

  if (user.canCreateBusiness) {
    return next();
  }

  return get401Response({
    res,
    json: { message: 'The user is not business owner' }
  });
};
