import { FilterQuery, PaginateOptions, Schema, UpdateQuery } from 'mongoose';
import { ModelDocument, QueryHandle } from '../../types/general';
import { PostModel } from '../../schemas/post';
import { Post } from '../../types/post';
import { PaginateResult } from '../../middlewares/pagination';
import { imagesServices } from '../images/services';

import { isNumber } from '../../utils/general';
import { GetAllPostArgs, getAllFilterQuery } from './utils';

const getAllWithPagination: QueryHandle<
  {
    paginateOptions?: PaginateOptions;
    query: GetAllPostArgs;
  },
  PaginateResult<Post>
> = async ({ paginateOptions = {}, query }) => {
  const filterQuery = getAllFilterQuery(query);

  const out = await PostModel.paginate(filterQuery, paginateOptions);

  return out as unknown as PaginateResult<Post>;
};

const getAll: QueryHandle<{ query: GetAllPostArgs }, Array<Post>> = async ({ query }) => {
  const filterQuery = getAllFilterQuery(query);

  const out = await PostModel.find(filterQuery);

  return out;
};

const getOne: QueryHandle<
  {
    postId: string | Schema.Types.ObjectId;
    hidden?: boolean;
  },
  ModelDocument<Post> | null
> = async ({ postId, hidden }) => {
  const filterQuery: FilterQuery<Post> = {};

  if (postId) {
    filterQuery._id = postId;
  }

  if (hidden !== undefined) {
    filterQuery.hidden = hidden;
  }

  const out = await PostModel.findOne(filterQuery);

  return out;
};

const deleteMany: QueryHandle<{
  routeName?: string;
  postIds?: Array<string>;
}> = async ({ routeName, postIds }) => {
  if (routeName) {
    await PostModel.deleteMany({
      routeName,
    });

    return;
  }

  if (postIds?.length) {
    await PostModel.deleteMany({
      _id: { $in: postIds },
    });

    return;
  }
};

const deleteOne: QueryHandle<{
  postId: string;
}> = async ({ postId }) => {
  /**
   * Removing the post
   */
  const post = await PostModel.findOneAndDelete({
    _id: postId,
  });

  if (!post) {
    return;
  }
  /**
   * Remove all images of post
   */
  await imagesServices.deleteImagesBy({
    userId: post.createdBy.toString(),
    postId,
    routeName: post.routeName,
  });
};

const addOne: QueryHandle<
  Pick<
    Post,
    | 'currency'
    | 'hidden'
    | 'hiddenBusiness'
    | 'description'
    | 'images'
    | 'price'
    | 'routeName'
    | 'name'
    | 'clothingSizes'
    | 'colors'
    | 'details'
    | 'highlights'
    | 'createdBy'
    | 'postPageLayout'
    | 'postCategoriesTags'
    | 'stockAmount'
    | 'postType'
    | 'postLink'
  >,
  Post
> = async (args) => {
  const newPost = new PostModel(args);

  await newPost.save();

  return newPost;
};

const updateOne: QueryHandle<{
  query: FilterQuery<Post>;
  update: UpdateQuery<Post>;
}> = async ({ query, update }) => {
  await PostModel.updateOne(query, update);
};

const findOneAndUpdate: QueryHandle<
  {
    query: FilterQuery<Post>;
    update: UpdateQuery<Post>;
  },
  Post | null
> = async ({ query, update }) => {
  const out = await PostModel.findOneAndUpdate(query, update);

  return out;
};

const updateStockAmount: QueryHandle<
  {
    amountToAdd: number;
    post: Post;
  },
  {
    amountAddedToPost: number;
    currentStockAmount: number;
  } | null
> = async ({ amountToAdd, post }) => {
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
  getAllWithPagination,
  getAll,
  addOne,
  getOne,
  updateOne,
  updateMany,
  deleteOne,
  updateStockAmount,
  findOneAndUpdate,
};
