import { AnyRecord, RequestHandler } from '../../types/general';
import { withTryCatch } from '../../utils/error';
import { GetAllArgs, postServices } from './services';
import { ServerResponse } from 'http';
import { imagesServices } from '../images/services';
import {
  get200Response,
  get400Response,
  getPostNotFoundResponse,
  getUserNotFoundResponse,
} from '../../utils/server-response';
import { isEmpty, isEqual } from '../../utils/general';
import { Post } from '../../types/post';
import { makeReshaper } from '../../utils/makeReshaper';

const get_posts: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { query, paginateOptions } = req;

      const {
        search,
        routeNames,
        postCategoriesTags,
        postCategoriesMethod,
        includeHidden,
        postsIds,
        postType,
      } = query;

      const out = await postServices.getAll({
        res,
        req,
        paginateOptions,
        postsIds,
        routeNames,
        search,
        hidden: includeHidden ? undefined : false,
        hiddenBusiness: includeHidden ? undefined : false,
        postCategoriesTags,
        postCategoriesMethod,
        postType,
      });

      if (out instanceof ServerResponse) return;

      res.send(out);
    });
  };
};

const get_posts_postId: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params } = req;
      const { postId } = params;

      const out = await postServices.getOne({
        res,
        postId,
        req,
      });

      if (out instanceof ServerResponse) return;

      res.send(out);
    });
  };
};

const post_posts: () => RequestHandler<AnyRecord, any, Post> = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { user } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { body } = req;

      const {
        name,
        routeName,
        hidden,
        hiddenBusiness,
        clothingSizes,
        colors,
        currency,
        description,
        details,
        highlights,
        images,
        postPageLayout,
        price,
        postCategoriesTags,
        stockAmount,
        postType,
        postLink,
      } = body;

      const out = await postServices.addOne({
        name,
        routeName,
        hidden,
        hiddenBusiness,
        clothingSizes,
        colors,
        currency,
        description,
        details,
        highlights,
        images,
        postPageLayout,
        price,
        postCategoriesTags,
        stockAmount,
        //
        createdBy: user._id,
        postType,
        postLink,
        res,
        req,
      });

      if (out instanceof ServerResponse) return;

      res.send(out);
    });
  };
};

const post_posts_postId_duplicate: () => RequestHandler = () => {
  return (req, res, next) => {
    withTryCatch(req, res, async () => {
      const { params } = req;

      const { postId } = params;

      const post = await postServices.getOne({
        postId,
        res,
        req,
      });

      if (post instanceof ServerResponse) return post;

      //these are omitted fields
      //eslint-disable-next-line
      const { _id, createdAt, createdBy, reviews, images, ...propsToUse } = post;

      req.body = propsToUse;
      req.body.name = `${req.body.name} (copy)`;

      // add new post
      //TODO it show be created next to the current post
      return post_posts()(req, res, next);
    });
  };
};

const put_posts_postId: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { post, body } = req;

      if (!post) {
        return getPostNotFoundResponse({
          res,
        });
      }

      if (!isEqual(body.images, post.images)) {
        await imagesServices.deleteOldImages({
          res,
          req,
          newImagesSrcs: body.images,
          oldImagesSrcs: post.images,
        });
      }

      const out = await postServices.updateOne({
        res,
        req,
        query: {
          _id: post._id,
        },
        update: makeReshaper<Partial<Post>, Partial<Post>>({
          clothingSizes: 'clothingSizes',
          colors: 'colors',
          details: 'details',
          highlights: 'highlights',
          images: 'images',
          name: 'name',
          price: 'price',
          reviews: 'reviews',
          currency: 'currency',
          description: 'description',
          hidden: 'hidden',
          hiddenBusiness: 'hiddenBusiness',
          postCategoriesTags: 'postCategoriesTags',
          discount: 'discount',
          postPageLayout: 'postPageLayout',
          stockAmount: 'stockAmount',
          postLink: 'postLink',
        })(body),
      });

      if (out instanceof ServerResponse) return;

      // await notificationsServices.sendNotification({
      //   title: "Producto actulizado",
      //   message: `El producto ${currentPost.name} ha sido actualizado`,
      // });

      res.send(out);
    });
  };
};

const delete_posts_postId: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params } = req;
      const { postId } = params;

      /**
       * Removing the post
       */
      const out = await postServices.deleteOne({
        res,
        req,
        postId,
      });

      if (out instanceof ServerResponse) return out;

      res.send(out);
    });
  };
};

const bulk_action_delete: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { body } = req;

      const { ids, query, routeName } = body as {
        ids?: Array<string>;
        all?: boolean;
        routeName: string;
        query?: Pick<GetAllArgs, 'postCategoriesMethod' | 'postCategoriesTags' | 'search'>;
      };

      if (ids?.length) {
        // delete selected posts

        const out = await postServices.deleteMany({
          res,
          req,
          postIds: ids,
          routeName,
        });

        if (out instanceof ServerResponse) return out;
      } else if (!isEmpty(query)) {
        const { postCategoriesMethod, postCategoriesTags, search } = query;

        const posts = await postServices.getAllWithOutPagination({
          res,
          req,
          routeNames: [routeName],
          postCategoriesMethod,
          postCategoriesTags,
          search,
        });

        if (posts instanceof ServerResponse) return posts;

        const out = await postServices.deleteMany({
          res,
          req,
          postIds: posts.map((post) => post._id.toString()),
          routeName,
        });

        if (out instanceof ServerResponse) return out;
      } else {
        // get all post
        const posts = await postServices.getAllWithOutPagination({
          res,
          req,
          routeNames: [routeName],
        });

        if (posts instanceof ServerResponse) return posts;

        const out = await postServices.deleteMany({
          res,
          req,
          postIds: posts.map((post) => post._id.toString()),
          routeName,
        });

        if (out instanceof ServerResponse) return out;
      }

      res.send();
    });
  };
};
const bulk_action_update: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { body } = req;

      const { ids, update, query, routeName } = body as {
        ids?: Array<string>;
        all?: boolean;
        routeName: string;
        update: {
          hidden: boolean;
        };
        query?: Pick<GetAllArgs, 'postCategoriesMethod' | 'postCategoriesTags' | 'search'>;
      };

      const { hidden } = update || {};

      if (ids?.length) {
        const out = await postServices.updateMany({
          res,
          req,
          query: {
            _id: { $in: ids },
          },
          update: {
            hidden,
          },
        });

        if (out instanceof ServerResponse) return out;
      } else if (!isEmpty(query)) {
        // TODO esto puede ser mejorado en una sola quuery
        const { postCategoriesMethod, postCategoriesTags, search } = query;

        const posts = await postServices.getAllWithOutPagination({
          res,
          req,
          routeNames: [routeName],
          postCategoriesMethod,
          postCategoriesTags,
          search,
        });

        if (posts instanceof ServerResponse) return posts;

        const out = await postServices.updateMany({
          res,
          req,
          query: {
            _id: { $in: posts.map(({ _id }) => _id) },
          },
          update: {
            hidden,
          },
        });

        if (out instanceof ServerResponse) return out;
      } else {
        // get all posts
        const posts = await postServices.getAllWithOutPagination({
          res,
          req,
          routeNames: [routeName],
        });

        if (posts instanceof ServerResponse) return posts;

        const out = await postServices.updateMany({
          res,
          req,
          query: {
            _id: { $in: posts.map(({ _id }) => _id) },
          },
          update: {
            hidden,
          },
        });

        if (out instanceof ServerResponse) return out;
      }

      res.send();
    });
  };
};

const post_make_review: () => RequestHandler = () => {
  return async (req, res) => {
    const { user } = req;
    const { postId } = req.params;
    const { value } = req.body;

    if (value < 1 || value > 5) {
      return get400Response({ res, json: { message: 'Invalid review value' } });
    }

    const out = await postServices.findOneAndUpdate({
      res,
      req,
      query: {
        _id: postId,
        createdBy: { $ne: user },
        reviewsUserIds: { $nin: [user] },
      },
      update: {
        $inc: { [`reviews.${value - 1}`]: 1 },
        $push: { reviewsUserIds: user },
      },
    });

    if (!out) {
      return get400Response({
        res,
        json: { message: 'El post no existe o el usuario no puede hacer el review' },
      });
    }

    return get200Response({ res, json: { message: 'Review was send correctly' } });
  };
};

export const postHandles = {
  get_posts,
  post_posts,
  post_posts_postId_duplicate,
  //
  get_posts_postId,
  put_posts_postId,
  delete_posts_postId,
  //
  bulk_action_delete,
  bulk_action_update,
  post_make_review,
};
