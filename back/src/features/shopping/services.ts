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
import { Business } from '../../types/business';
import { businessServices } from '../business/services';

const addOne: QueryHandle<
  {
    amountToAdd?: number;
    purshaseNotes?: PostPurshaseNotes;
    user: User;
    post: Post;
  },
  void
> = async ({ amountToAdd = 1, purshaseNotes, user, post }) => {
  const { routeName } = post;

  const businessData: ModelDocument<Pick<Business, 'currency'>> | null =
    await businessServices.findOne({
      query: {
        routeName,
      },
      projection: {
        currency: 1,
      },
    });

  if (!businessData) return;

  const newShopping = new ShoppingModel({
    state: 'CONSTRUCTION',
    purchaserId: user._id,
    purchaserName: user.name,
    routeName,
    currency: businessData.currency,
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
};

const addPostToOne: QueryHandle<
  {
    amountToAdd?: number;
    post: Post;
    currentShopping: ModelDocument<Shopping>;
  },
  void
> = async ({ amountToAdd = 1, post, currentShopping }) => {
  const { _id: postId } = post;

  const existsPost = currentShopping.posts.find((e) => {
    return isEqualIds(e.postData._id, postId);
  });

  if (existsPost) {
    await ShoppingModel.updateOne(
      {
        _id: currentShopping._id,
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
        _id: currentShopping._id,
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
};

const updateOrAddOne: QueryHandle<
  {
    amountToAdd?: number;
    purshaseNotes?: PostPurshaseNotes;
    user: User;
    post: Post;
  },
  void
> = async ({ amountToAdd = 1, purshaseNotes, user, post }) => {
  const { routeName } = post;

  const existInConstruction = await ShoppingModel.findOne({
    purchaserId: user._id,
    state: 'CONSTRUCTION',
    routeName: routeName,
  });

  if (existInConstruction) {
    await addPostToOne({ amountToAdd, post, currentShopping: existInConstruction });
  } else {
    await addOne({ amountToAdd, purshaseNotes, user, post });
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

const deleteMany: QueryHandle<
  {
    query: FilterQuery<Shopping>;
  },
  void
> = async ({ query }) => {
  await ShoppingModel.deleteMany(query);
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
  deleteMany,
  findAndUpdateOne,
  findOneAndDelete,
  addOne,
};
