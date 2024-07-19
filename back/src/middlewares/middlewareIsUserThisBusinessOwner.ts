import { RequestHandler } from 'express';

import { isEqualIds } from '../utils/general';
import {
  get401Response,
  get404Response,
  getBusinessNotFoundResponse,
} from '../utils/server-response';

import { businessServicesFindOne } from '../features/business/services';
import { getFieldInReqData } from './utils';

export const middlewareIsUserThisBusinessOwner: RequestHandler = async (req, res, next) => {
  const { user } = req;
  const routeName = getFieldInReqData(req, 'routeName');

  if (!user) {
    return get404Response({
      res,
      json: { message: 'user not found' },
    });
  }

  if (!routeName) {
    return get404Response({
      res,
      json: { message: 'routeName not found' },
    });
  }

  const business = await businessServicesFindOne({
    query: {
      routeName,
    },
  });

  if (!business) {
    return getBusinessNotFoundResponse({ res });
  }

  if (isEqualIds(user._id, business.createdBy)) {
    req['business'] = business.toJSON();
    return next();
  }

  get401Response({
    res,
    json: { message: 'The user has not access to this business' },
  });
};
