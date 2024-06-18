import { ModelDocument, QueryHandle } from '../../types/general';
import { FilterQuery, PaginateOptions, ProjectionType, UpdateQuery } from 'mongoose';
import { UpdateOptions } from 'mongodb';
import { ShoppingModel } from '../../schemas/shopping';
import { Shopping } from '../../types/shopping';
import { Post, PostPurshaseNotes } from '../../types/post';
import { isEqualIds } from '../../utils/general';
import { User } from '../../types/user';
import { PaginateResult } from '../../middlewares/pagination';
import {
  GetAllShoppingArgs,
  getAllShoppingFilterQuery,
  postToShoppingPostDataReshaper,
} from './utils';
import { getSortQuery } from '../../utils/schemas';

const updateOrAddOne: QueryHandle<
  {
    amountToAdd?: number;
    purshaseNotes?: PostPurshaseNotes;
    user: User;
    post: Post;
  },
  void
> = async ({ amountToAdd = 1, purshaseNotes, user, post }) => {
  const { _id: postId, routeName } = post;

  const existInConstruction = await ShoppingModel.findOne({
    purchaserId: user._id,
    state: 'CONSTRUCTION',
    routeName: routeName,
  });

  if (existInConstruction) {
    const existePost = existInConstruction.posts.find((e) => {
      return isEqualIds(e.postData._id, postId);
    });

    if (existePost) {
      await ShoppingModel.updateOne(
        {
          _id: existInConstruction._id,
        },
        {
          $set: {
            'posts.$[p].lastUpdatedDate': new Date(),
          },
          $inc: {
            'posts.$[p].count': amountToAdd,
          },
        },
        {
          arrayFilters: [
            {
              'p.postData._id': postId,
            },
          ],
        },
      );
    } else {
      await ShoppingModel.updateOne(
        {
          _id: existInConstruction._id,
        },
        {
          $push: {
            posts: {
              postData: postToShoppingPostDataReshaper(post),
              count: amountToAdd,
              lastUpdatedDate: new Date(),
            },
          },
        },
        {
          arrayFilters: [
            {
              'p.post._id': postId,
            },
          ],
        },
      );
    }
  } else {
    const newShopping = new ShoppingModel({
      state: 'CONSTRUCTION',
      purchaserId: user._id,
      purchaserName: user.name,
      routeName,
      posts: [
        {
          postData: postToShoppingPostDataReshaper(post),
          purshaseNotes,
          count: amountToAdd,
          lastUpdatedDate: new Date(),
        },
      ],
    });

    await newShopping.save();
  }
};

const getAllWithPagination: QueryHandle<
  {
    paginateOptions?: PaginateOptions;
    query: GetAllShoppingArgs;
    sort?: string;
  },
  PaginateResult<Shopping>
> = async ({ query, sort, paginateOptions = {} }) => {
  const filterQuery = getAllShoppingFilterQuery(query);

  const out = await ShoppingModel.paginate(filterQuery, {
    ...paginateOptions,
    sort: getSortQuery(sort),
  });

  return out as unknown as PaginateResult<Shopping>;
};

const getAll: QueryHandle<
  {
    query: GetAllShoppingArgs;
    projection?: ProjectionType<Shopping>;
  },
  Array<ModelDocument<Shopping>>
> = async ({ query, projection }) => {
  const filterQuery = getAllShoppingFilterQuery(query);

  const out = await ShoppingModel.find(filterQuery, projection);

  return out;
};

const getOne: QueryHandle<
  {
    query: FilterQuery<Shopping>;
  },
  ModelDocument<Shopping> | null
> = async ({ query }) => {
  const out = await ShoppingModel.findOne(query);

  return out;
};

const updateOne: QueryHandle<
  {
    query: FilterQuery<Shopping>;
    update: UpdateQuery<Shopping>;
    options?: UpdateOptions;
  },
  void
> = async ({ query, update, options }) => {
  await ShoppingModel.updateOne(query, update, options);
};

const updateMany: QueryHandle<
  {
    query: FilterQuery<Shopping>;
    update: UpdateQuery<Shopping>;
    options?: UpdateOptions;
  },
  void
> = async ({ query, update, options }) => {
  await ShoppingModel.updateMany(query, update, options);
};

const findAndUpdateOne: QueryHandle<
  {
    query: FilterQuery<Shopping>;
    update: UpdateQuery<Shopping>;
  },
  Shopping | null
> = async ({ query, update }) => {
  return await ShoppingModel.findOneAndUpdate(query, update);
};

const deleteOne: QueryHandle<
  {
    query: FilterQuery<Shopping>;
  },
  void
> = async ({ query }) => {
  await ShoppingModel.deleteOne(query);
};

const findOneAndDelete: QueryHandle<
  {
    query: FilterQuery<Shopping>;
  },
  Shopping | null
> = async ({ query }) => {
  return await ShoppingModel.findOneAndDelete(query);
};

export const shoppingServices = {
  getOne,
  updateOne,
  updateMany,
  updateOrAddOne,
  getAllWithPagination,
  getAll,
  deleteOne,
  findAndUpdateOne,
  findOneAndDelete,
};
