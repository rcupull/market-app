import { RequestHandler } from 'express';

import { postServicesGetOne } from '../features/post/services';
import { isEqualIds } from '../utils/general';
import {
  get401Response,
  get404Response,
  getPostNotFoundResponse,
  getUserNotFoundResponse,
} from '../utils/server-response';

import { getFieldInReqData } from './utils';

export const middlewareIsUserThisPostOwner: RequestHandler = async (req, res, next) => {
  const { user } = req;

  if (!user) {
    return getUserNotFoundResponse({ res });
  }

  const postId = getFieldInReqData(req, 'postId');

  if (!postId) {
    return get404Response({
      res,
      json: { message: 'routeName not found' },
    });
  }

  const post = await postServicesGetOne({
    query: {
      _id: postId,
    },
  });

  if (!post) {
    return getPostNotFoundResponse({ res });
  }

  if (isEqualIds(user._id, post.createdBy)) {
    req.post = post.toJSON();
    return next();
  }

  get401Response({
    res,
    json: { message: 'The user has not access to this post' },
  });
};
