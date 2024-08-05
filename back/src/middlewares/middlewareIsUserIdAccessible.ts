import { RequestHandler } from 'express';
import { get401Response, get404Response, getUserNotFoundResponse } from '../utils/server-response';

export const middlewareIsUserIdAccessible: RequestHandler = (req, res, next) => {
  const { user } = req;

  if (!user) {
    return getUserNotFoundResponse({ res });
  }

  const { userId } = req.params;

  if (!userId) {
    return get404Response({
      res,
      json: { message: 'UserId not found' }
    });
  }

  if (user._id.toString() === userId) return next();

  get401Response({
    res,
    json: { message: 'The user has not access to this data' }
  });
};
