import { FilterQuery, PaginateOptions, QueryOptions, UpdateQuery } from 'mongoose';
import { ModelDocument, QueryHandle } from '../../types/general';
import { PostModel } from '../../schemas/post';
import { Post } from '../../types/post';
import { PaginateResult } from '../../middlewares/pagination';

import { isNumber } from '../../utils/general';
import { GetAllPostArgs, getAllFilterQuery } from './utils';
import { ProjectionType } from 'mongoose';

import { getSortQuery } from '../../utils/schemas';
import { imagesServicesDeleteBulk } from '../images/services';

interface DeletePostQuery extends FilterQuery<Post> {
  postIds?: Array<string>;
}

export const postServicesGetAllWithPagination: QueryHandle<
  {
    paginateOptions?: PaginateOptions;
    query: GetAllPostArgs;
    sort?: string;
  },
  PaginateResult<Post>
> = async ({ paginateOptions = {}, query, sort }) => {
  const filterQuery = getAllFilterQuery(query);

  const out = await PostModel.paginate(filterQuery, {
    ...paginateOptions,
    sort: getSortQuery(sort),
  });

  return out as unknown as PaginateResult<Post>;
};

export const postServicesGetAll: QueryHandle<
  { query: GetAllPostArgs; projection?: ProjectionType<Post>; options?: QueryOptions },
  Array<Post>
> = async ({ query, projection, options }) => {
  const filterQuery = getAllFilterQuery(query);

  const out = await PostModel.find(filterQuery, projection, options);

  return out;
};

export const postServicesGetOne: QueryHandle<
  {
    query: FilterQuery<Post> & { hidden?: boolean };
  },
  ModelDocument<Post> | null
> = async ({ query }) => {
  const { hidden, ...omittedQuery } = query;

  const filterQuery: FilterQuery<Post> = omittedQuery;

  if (hidden !== undefined) {
    filterQuery.hidden = hidden;
  }

  const out = await PostModel.findOne(filterQuery);

  return out;
};

export const postServicesDeleteMany: QueryHandle<{
  query: DeletePostQuery;
}> = async ({ query }) => {
  const { postIds, ...rest } = query;

  const filterQuery: FilterQuery<Post> = rest;

  if (postIds?.length) {
    filterQuery._id = { $in: postIds };
  }

  await PostModel.deleteMany(filterQuery);
};

export const postServicesDeleteOne: QueryHandle<{
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
  await imagesServicesDeleteBulk({
    userId: post.createdBy.toString(),
    postId,
    routeName: post.routeName,
  });
};

export const postServicesAddOne: QueryHandle<
  Pick<
    Post,
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

export const postServicesUpdateOne: QueryHandle<{
  query: FilterQuery<Post>;
  update: UpdateQuery<Post>;
}> = async ({ query, update }) => {
  await PostModel.updateOne(query, update);
};

export const postServicesFindOneAndUpdate: QueryHandle<
  {
    query: FilterQuery<Post>;
    update: UpdateQuery<Post>;
  },
  Post | null
> = async ({ query, update }) => {
  const out = await PostModel.findOneAndUpdate(query, update);

  return out;
};

export const postServicesUpdateStockAmount: QueryHandle<
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
        },
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
      },
    );

    return {
      amountAddedToPost: amountToAdd,
      currentStockAmount: newStockAmount,
    };
  }

  return null;
};

export const postServicesUpdateMany: QueryHandle<{
  query: FilterQuery<Post>;
  update: UpdateQuery<Post>;
}> = async ({ query, update }) => {
  await PostModel.updateMany(query, update);
};
