import { AnyRecord, RequestHandler } from '../../types/general';
import { withTryCatch } from '../../utils/error';
import {
  postServicesAddOne,
  postServicesDeleteMany,
  postServicesDeleteOne,
  postServicesGetAll,
  postServicesGetAllWithPagination,
  postServicesGetOne,
  postServicesUpdateMany,
  postServicesUpdateOne,
} from './services';

import { getPostNotFoundResponse, getUserNotFoundResponse } from '../../utils/server-response';
import { deepJsonCopy, isEmpty, isEqual } from '../../utils/general';
import { Post, PostDto } from '../../types/post';
import { makeReshaper } from '../../utils/makeReshaper';
import { GetAllPostArgs } from './utils';
import { defaultQuerySort } from '../../utils/api';
import { imagesServicesDeleteOldImages } from '../images/services';
import { shoppingServicesGetDataFromPosts } from '../shopping/services';

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
        sort = defaultQuerySort,
      } = query;

      const posts = await postServicesGetAllWithPagination({
        paginateOptions,
        sort,
        query: {
          postsIds,
          routeNames,
          search,
          hidden: includeHidden === 'true' ? undefined : false,
          hiddenBusiness: includeHidden === 'true' ? undefined : false,
          postCategoriesTags,
          postCategoriesMethod,
          postType,
        },
      });

      const { getPostData } = await shoppingServicesGetDataFromPosts({
        posts: posts.data,
      });

      const out = deepJsonCopy(posts);

      const getPostDto = async (post: Post): Promise<PostDto> => {
        const { amountInProcess, stockAmountAvailable } = getPostData(post);

        return {
          ...post,
          stockAmountAvailable,
          amountInProcess,
        };
      };

      const promises = out.data.map(getPostDto);
      out.data = await Promise.all(promises);

      res.send(out);
    });
  };
};

const get_posts_postId: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params } = req;
      const { postId } = params;

      const post = await postServicesGetOne({
        query: {
          _id: postId,
        },
      });

      if (!post) {
        return getPostNotFoundResponse({ res });
      }

      const out = deepJsonCopy(post);

      const { getPostData } = await shoppingServicesGetDataFromPosts({
        posts: [out],
      });

      const getPostDto = (post: Post): PostDto => {
        const { amountInProcess, stockAmountAvailable } = getPostData(post);

        return {
          ...post,
          stockAmountAvailable,
          amountInProcess,
        };
      };

      res.send(getPostDto(out));
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
        description,
        details,
        highlights,
        images,
        price,
        postCategoriesTags,
        stockAmount,
        postType,
        postLink,
      } = body;

      const out = await postServicesAddOne({
        name,
        routeName,
        hidden,
        hiddenBusiness,
        clothingSizes,
        colors,
        description,
        details,
        highlights,
        images,
        price,
        postCategoriesTags,
        stockAmount,
        //
        createdBy: user._id,
        postType,
        postLink,
      });

      res.send(out);
    });
  };
};

const post_posts_postId_duplicate: () => RequestHandler = () => {
  return (req, res, next) => {
    withTryCatch(req, res, async () => {
      const { params } = req;

      const { postId } = params;

      const post = await postServicesGetOne({
        query: {
          _id: postId,
        },
      });

      if (!post) {
        return getPostNotFoundResponse({ res });
      }

      //these are omitted fields
      //eslint-disable-next-line
      const { _id, createdAt, createdBy, images, stockAmount, ...propsToUse } = post.toJSON();

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
        await imagesServicesDeleteOldImages({
          newImagesSrcs: body.images,
          oldImagesSrcs: post.images,
        });
      }

      const out = await postServicesUpdateOne({
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
          description: 'description',
          hidden: 'hidden',
          hiddenBusiness: 'hiddenBusiness',
          postCategoriesTags: 'postCategoriesTags',
          discount: 'discount',
          stockAmount: 'stockAmount',
          postLink: 'postLink',
        })(body),
      });

      // await notificationsServicesSendNotification({
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
      const out = await postServicesDeleteOne({
        postId,
      });

      res.send(out);
    });
  };
};

const get_related_posts: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params, paginateOptions } = req;
      const { postId } = params;

      const post = await postServicesGetOne({ query: { _id: postId } });

      if (!post) {
        return getPostNotFoundResponse({ res });
      }

      const related = await postServicesGetAllWithPagination({
        paginateOptions,
        query: {
          _id: { $ne: postId },
          routeName: post.routeName,
          hidden: false,
          $expr: {
            $gt: [
              { $size: { $setIntersection: ['$postCategoriesTags', post.postCategoriesTags] } },
              0,
            ],
          },
        },
      });

      const { getPostData } = await shoppingServicesGetDataFromPosts({
        posts: related.data,
      });

      const out = deepJsonCopy(related);

      const getPostDto = async (post: Post): Promise<PostDto> => {
        const { amountInProcess, stockAmountAvailable } = getPostData(post);

        return {
          ...post,
          stockAmountAvailable,
          amountInProcess,
        };
      };

      const promises = out.data.map(getPostDto);
      out.data = await Promise.all(promises);

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
        query?: Pick<GetAllPostArgs, 'postCategoriesMethod' | 'postCategoriesTags' | 'search'>;
      };

      if (ids?.length) {
        // delete selected posts

        await postServicesDeleteMany({
          query: {
            postIds: ids,
            routeName,
          },
        });
      } else if (!isEmpty(query)) {
        const { postCategoriesMethod, postCategoriesTags, search } = query;

        const posts = await postServicesGetAll({
          query: {
            routeNames: [routeName],
            postCategoriesMethod,
            postCategoriesTags,
            search,
          },
        });

        await postServicesDeleteMany({
          query: {
            postIds: posts.map((post) => post._id.toString()),
            routeName,
          },
        });
      } else {
        // get all post
        const posts = await postServicesGetAll({
          query: {
            routeNames: [routeName],
          },
        });

        await postServicesDeleteMany({
          query: {
            postIds: posts.map((post) => post._id.toString()),
            routeName,
          },
        });
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
        query?: Pick<GetAllPostArgs, 'postCategoriesMethod' | 'postCategoriesTags' | 'search'>;
      };

      const { hidden } = update || {};

      if (ids?.length) {
        await postServicesUpdateMany({
          query: {
            _id: { $in: ids },
          },
          update: {
            hidden,
          },
        });
      } else if (!isEmpty(query)) {
        // TODO esto puede ser mejorado en una sola quuery
        const { postCategoriesMethod, postCategoriesTags, search } = query;

        const posts = await postServicesGetAll({
          query: {
            routeNames: [routeName],
            postCategoriesMethod,
            postCategoriesTags,
            search,
          },
        });

        await postServicesUpdateMany({
          query: {
            _id: { $in: posts.map(({ _id }) => _id) },
          },
          update: {
            hidden,
          },
        });
      } else {
        // get all posts
        const posts = await postServicesGetAll({
          query: {
            routeNames: [routeName],
          },
        });

        await postServicesUpdateMany({
          query: {
            _id: { $in: posts.map(({ _id }) => _id) },
          },
          update: {
            hidden,
          },
        });
      }

      res.send();
    });
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
  get_related_posts,
  //
  bulk_action_delete,
  bulk_action_update,
};
