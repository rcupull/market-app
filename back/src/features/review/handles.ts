import { RequestHandler } from '../../types/general';
import { withTryCatch } from '../../utils/error';

import {
  get200Response,
  get400Response,
  getBusinessNotFoundResponse,
  getPostNotFoundResponse,
  getUserNotFoundResponse
} from '../../utils/server-response';
import {
  reviewServicesAddOne,
  reviewServicesGetAll,
  reviewServicesGetAllWithPagination
} from './services';
import { Review, ReviewDto, ReviewSummary, ReviewType } from '../../types/reviews';
import { postServicesGetOne } from '../post/services';
import { Post } from '../../types/post';
import { Business } from '../../types/business';
import { businessServicesFindOne } from '../business/services';
import { deepJsonCopy, isEqualIds, isNumber } from '../../utils/general';
import { User } from '../../types/user';
import { userServicesGetAll } from '../user/services';

const get_reviews: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { paginateOptions, query } = req;

      const { postId, routeName } = query;

      if (!postId && !routeName) {
        return get400Response({
          res,
          json: {
            message: 'Please provide a postId or a routeName'
          }
        });
      }

      const response = await reviewServicesGetAllWithPagination({
        paginateOptions,
        query: {
          reviewed: postId || routeName
        }
      });

      const out = deepJsonCopy(response);

      const reviewersData: Array<Pick<User, 'name' | '_id'>> = await userServicesGetAll({
        query: {
          _id: { $in: out.data.map(({ reviewerId }) => reviewerId) }
        },
        projection: {
          name: 1,
          _id: 1
        }
      });

      const handleResolveDto = async (review: Review): Promise<ReviewDto> => {
        const { reviewerId } = review;
        const reviewer = reviewersData.find(({ _id }) => isEqualIds(_id, reviewerId));

        return {
          ...review,
          reviewerName: reviewer?.name
        };
      };

      const promises = out.data.map((review) => {
        return new Promise<ReviewDto>((resolve) => {
          handleResolveDto(review).then(resolve);
        });
      });

      out.data = await Promise.all(promises);

      res.send(out);
    });
  };
};

const get_reviews_summary: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { query } = req;

      const { postId, routeName } = query;

      if (!postId && !routeName) {
        return get400Response({
          res,
          json: {
            message: 'Please provide a postId or a routeName'
          }
        });
      }

      const allReview = await reviewServicesGetAll({
        query: {
          reviewed: postId || routeName
        }
      });

      const out: ReviewSummary = {
        starSummary: [0, 0, 0, 0, 0],
        reviewerIds: []
      };

      allReview.forEach(({ star, reviewerId }) => {
        if (isNumber(star)) {
          out.starSummary[star - 1] += 1;
        }

        out.reviewerIds.push(reviewerId.toString());
      });

      res.send(out);
    });
  };
};

const post_reviews: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { user, body } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { postId, routeName, star, comment } = body;

      const userReviews = await reviewServicesGetAll({
        query: {
          reviewerId: user._id
        }
      });

      if (postId) {
        const hasReview = userReviews.some(({ reviewed }) => isEqualIds(reviewed, postId));

        if (hasReview) {
          return get400Response({
            res,
            json: {
              message: 'You have already reviewed this post'
            }
          });
        }
        const postData: Pick<Post, '_id'> | null = await postServicesGetOne({
          query: {
            _id: postId
          },
          projection: {
            _id: true
          }
        });

        if (!postData) {
          return getPostNotFoundResponse({ res });
        }

        await reviewServicesAddOne({
          reviewerId: user._id,
          type: ReviewType.PRODUCT,
          reviewed: postData._id.toString(),
          comment,
          star
        });
      }

      if (routeName) {
        const hasReview = userReviews.some(({ reviewed }) => isEqualIds(reviewed, routeName));

        if (hasReview) {
          return get400Response({
            res,
            json: {
              message: 'You have already reviewed this business'
            }
          });
        }

        const businessData: Pick<Business, '_id'> | null = await businessServicesFindOne({
          query: {
            routeName
          },
          projection: {
            _id: true
          }
        });

        if (!businessData) {
          return getBusinessNotFoundResponse({ res });
        }

        await reviewServicesAddOne({
          reviewerId: user._id,
          type: ReviewType.BUSINESS,
          reviewed: routeName,
          comment,
          star
        });
      }

      get200Response({
        res,
        json: {}
      });
    });
  };
};

export const reviewsHandles = {
  get_reviews,
  post_reviews,
  get_reviews_summary
};
