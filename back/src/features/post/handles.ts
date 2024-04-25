import { RequestHandler } from "../../types/general";
import { withTryCatch } from "../../utils/error";
import { GetAllArgs, postServices } from "./services";
import { ServerResponse } from "http";
import { User } from "../../types/user";
import { imagesServices } from "../images/services";
import { Post } from "../../types/post";
import { getPostNotFoundResponse } from "../../utils/server-response";
import { isEmpty } from "../../utils/general";

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

const post_posts: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const user = req.user as User;
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
      const { _id, createdAt, createdBy, reviews, images, ...propsToUse } =
        post;

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
      const currentPost = req.post;

      if (!currentPost) {
        return getPostNotFoundResponse({
          res,
        });
      }

      const { params, body } = req;
      const { postId } = params;

      const { images } = body as Post;

      if (images?.length) {
        await imagesServices.deleteOldImages({
          res,
          req,
          newImagesSrcs: body.images,
          oldImagesSrcs: currentPost.images,
        });
      }

      const out = await postServices.updateOne({
        res,
        req,
        query: {
          _id: postId,
        },
        update: body,
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
        query?: Pick<
          GetAllArgs,
          "postCategoriesMethod" | "postCategoriesTags" | "search"
        >;
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
        query?: Pick<
          GetAllArgs,
          "postCategoriesMethod" | "postCategoriesTags" | "search"
        >;
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
};
