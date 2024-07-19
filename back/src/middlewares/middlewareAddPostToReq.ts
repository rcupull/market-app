import { RequestHandler } from 'express';

import { postServicesGetOne } from '../features/post/services';
import { getPostNotFoundResponse } from '../utils/server-response';

export const middlewareAddPostToReq: RequestHandler = async (req, res, next) => {
  const postId = req.params.postId || req.body.postId;

  if (!postId) {
    return next();
  }

  const post = await postServicesGetOne({
    query: {
      _id: postId,
    },
  });

  if (!post) {
    return getPostNotFoundResponse({ res });
  }

  req.post = post.toJSON();
  return next();
};
