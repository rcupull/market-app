import { FilterQuery, PaginateOptions, Schema, UpdateQuery } from "mongoose";
import { QueryHandle } from "../../types/general";
import { PostModel } from "../../schemas/post";
import { Post } from "../../types/post";
import { PaginateResult } from "../../middlewares/pagination";
import { imagesServices } from "../images/services";
import { ServerResponse } from "http";
import {
  get404Response,
  getPostNotFoundResponse,
} from "../../utils/server-response";
import { isNumber } from "../../utils/general";

export interface GetAllArgs {
  paginateOptions?: PaginateOptions;
  routeNames?: Array<string>;
  postsIds?: Array<string>;
  search?: string;
  hidden?: boolean;
  hiddenBusiness?: boolean;
  createdBy?: string;
  //
  postCategoriesTags?: Array<string>;
  postCategoriesMethod?: "some" | "every";
}

export type PostUpdate = Partial<
  Pick<
    Post,
    | "currency"
    | "description"
    | "images"
    | "price"
    | "clothingSizes"
    | "colors"
    | "details"
    | "highlights"
    | "hidden"
    | "hiddenBusiness"
    | "name"
    | "reviews"
    | "postCategoriesTags"
    | "discount"
    | "postPageLayout"
    | "stockAmount"
  >
>;

const getAll: QueryHandle<GetAllArgs, PaginateResult<Post>> = async ({
  paginateOptions = {},
  routeNames,
  postsIds,
  search,
  hiddenBusiness,
  hidden,
  createdBy,
  postCategoriesTags,
  postCategoriesMethod,
}) => {
  const filterQuery: FilterQuery<Post> = {};

  ///////////////////////////////////////////////////////////////////

  if (search) {
    filterQuery.name = { $regex: new RegExp(search), $options: "i" };
  }

  if (postCategoriesTags) {
    switch (postCategoriesMethod) {
      case "every": {
        filterQuery.postCategoriesTags = { $all: postCategoriesTags };
        break;
      }
      case "some": {
        filterQuery.postCategoriesTags = { $in: postCategoriesTags };
        break;
      }
      default: {
        filterQuery.postCategoriesTags = { $all: postCategoriesTags };
        break;
      }
    }
  }

  ///////////////////////////////////////////////////////////////////

  if (routeNames?.length) {
    filterQuery.routeName = { $in: routeNames };
  }

  if (postsIds?.length) {
    filterQuery._id = { $in: postsIds };
  }

  ///////////////////////////////////////////////////////////////////

  if (hidden !== undefined) {
    filterQuery.hidden = hidden;
  }

  ///////////////////////////////////////////////////////////////////

  if (hiddenBusiness !== undefined) {
    filterQuery.hiddenBusiness = hiddenBusiness;
  }

  ///////////////////////////////////////////////////////////////////

  if (createdBy) {
    filterQuery.createdBy = createdBy;
  }

  ///////////////////////////////////////////////////////////////////

  const out = await PostModel.paginate(filterQuery, paginateOptions);

  return out as unknown as PaginateResult<Post>;
};

const getAllWithOutPagination: QueryHandle<GetAllArgs, Array<Post>> = async (
  args
) => {
  const out = await getAll({
    ...args,
    paginateOptions: {
      pagination: false,
    },
  });

  if (out instanceof ServerResponse) return out;

  return out.data;
};

const getOne: QueryHandle<
  {
    postId: string | Schema.Types.ObjectId;
    hidden?: boolean;
  },
  Post
> = async ({ postId, res, hidden }) => {
  const filterQuery: FilterQuery<Post> = {};

  if (postId) {
    filterQuery._id = postId;
  }

  if (hidden !== undefined) {
    filterQuery.hidden = hidden;
  }

  const out = await PostModel.findOne(filterQuery);

  if (!out) {
    return get404Response({
      res,
      json: { message: "Post not found or you are not access to this post" },
    });
  }

  return out.toJSON();
};

const deleteMany: QueryHandle<{
  routeName: string;
  postIds?: Array<string>;
}> = async ({ res, req, routeName, postIds: postIdsT }) => {
  let postIds: Array<string> = postIdsT || [];

  let postToRemove: Array<Post> = [];

  if (postIds.length) {
    postToRemove = await PostModel.find({
      _id: { $in: postIds },
    });
  } else {
    postToRemove = await PostModel.find({
      routeName,
    });
  }

  if (postIds?.length) {
    const promises = postToRemove.map((post) => {
      return deleteOne({
        res,
        //@ts-expect-error ignore
        req: {
          ...req,
          post,
        },
        postId: post._id.toString(),
      });
    });

    await Promise.all(promises);
  }
};

const deleteOne: QueryHandle<{
  postId: string;
}> = async ({ postId, res, req }) => {
  const currentPost = req.post;

  if (!currentPost) {
    return getPostNotFoundResponse({
      res,
    });
  }

  /**
   * Remove all images of post
   */
  await imagesServices.deleteDir({
    res,
    req,
    userId: currentPost.createdBy.toString(),
    postId,
    routeName: currentPost.routeName,
  });

  /**
   * Removing the post
   */
  await PostModel.deleteOne({
    _id: postId,
  });
};

const addOne: QueryHandle<
  Pick<
    Post,
    | "currency"
    | "hidden"
    | "hiddenBusiness"
    | "description"
    | "images"
    | "price"
    | "routeName"
    | "name"
    | "clothingSizes"
    | "colors"
    | "details"
    | "highlights"
    | "createdBy"
    | "postPageLayout"
    | "postCategoriesTags"
    | "stockAmount"
  >,
  Post
> = async (args) => {
  const newPost = new PostModel(args);

  await newPost.save();

  return newPost;
};

const updateOne: QueryHandle<{
  query: FilterQuery<Post>;
  update: PostUpdate;
}> = async ({ query, update }) => {
  const {
    clothingSizes,
    colors,
    details,
    highlights,
    images,
    name,
    price,
    reviews,
    currency,
    description,
    hidden,
    hiddenBusiness,
    postCategoriesTags,
    discount,
    postPageLayout,
    stockAmount,
  } = update;

  await PostModel.updateOne(query, {
    clothingSizes,
    colors,
    details,
    highlights,
    images,
    name,
    price,
    reviews,
    currency,
    description,
    hidden,
    hiddenBusiness,
    postCategoriesTags,
    discount,
    postPageLayout,
    stockAmount,
  });
};

const updateStockAmount: QueryHandle<
  {
    amountToAdd: number;
  },
  {
    amountAddedToPost: number;
    currentStockAmount: number;
  } | null
> = async ({ amountToAdd, req, res }) => {
  const { post } = req;

  if (!post) {
    return getPostNotFoundResponse({ res });
  }

  if (isNumber(post.stockAmount)) {
    /**
     * Enabled stock amount feature
     */
    let newStockAmount = post.stockAmount + amountToAdd;

    if (newStockAmount < 0) {
      newStockAmount = 0;
      await PostModel.updateOne(
        {
          _id: post._id,
        },
        {
          stockAmount: newStockAmount,
        }
      );

      return {
        amountAddedToPost: -post.stockAmount,
        currentStockAmount: newStockAmount,
      };
    }

    await PostModel.updateOne(
      {
        _id: post._id,
      },
      {
        stockAmount: newStockAmount,
      }
    );

    return {
      amountAddedToPost: amountToAdd,
      currentStockAmount: newStockAmount,
    };
  }

  return null;
};

const updateMany: QueryHandle<{
  query: FilterQuery<Post>;
  update: UpdateQuery<Post>;
}> = async ({ query, update }) => {
  await PostModel.updateMany(query, update);
};

export const postServices = {
  deleteMany,
  getAll,
  getAllWithOutPagination,
  addOne,
  getOne,
  updateOne,
  updateMany,
  deleteOne,
  updateStockAmount,
};
