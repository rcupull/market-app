import { ModelDocument, QueryHandle } from '../../types/general';
import { FilterQuery, PaginateOptions, ProjectionType, UpdateQuery } from 'mongoose';
import { UpdateOptions } from 'mongodb';
import { ShoppingModel } from '../../schemas/shopping';
import { Shopping, ShoppingState } from '../../types/shopping';
import { Post, PostPurshaseNotes } from '../../types/post';
import { isEqualIds, isNumber } from '../../utils/general';
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
import { postServices } from '../post/services';
import { logger } from '../logger';
import { notificationsServices } from '../notifications/services';
import { agendaServices } from '../agenda/services';

const addOne: QueryHandle<
  {
    amountToAdd?: number;
    purshaseNotes?: PostPurshaseNotes;
    user: User;
    post: Post;
  },
  ModelDocument<Shopping> | null
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

  if (!businessData) return null;

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

  return newShopping;
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
    await agendaServices.scheduleRemoveOrderInConstruction({
      orderId: existInConstruction._id.toString(),
    });
  } else {
    const shopping = await addOne({ amountToAdd, purshaseNotes, user, post });

    if (!shopping) return;

    await agendaServices.scheduleRemoveOrderInConstruction({ orderId: shopping._id.toString() });
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

const getStockAmountAvailableFromPost: QueryHandle<
  {
    post: Post;
    shoppings: Array<Shopping>;
  },
  number | null
> = async ({ post, shoppings }) => {
  const { stockAmount } = post;

  if (!stockAmount) return null; // this be 0, null or undefined

  const postCount = shoppings.reduce((acc, shopping) => {
    let out = acc;
    shopping.posts.forEach(({ count, postData }) => {
      if (isEqualIds(postData._id, post._id)) {
        out = out + count;
      }
    });

    return out;
  }, 0);

  return stockAmount - postCount;
};

const getStockAmountAvailableFromPosts: QueryHandle<
  {
    posts: Array<Post>;
  },
  Array<number | null>
> = async ({ posts }) => {
  /**
   * shopping que tienen estos productos incluidos pero todavia no han sido vendidos. O sea, existen en los almacenes del comerciante
   * El stockAmount de los posts sera decrementado una vez se haya vendido y entregado el producto (cambia para ShoppingState.DELIVERED)*/
  const allShoppings = await shoppingServices.getAll({
    query: {
      'posts.postData._id': { $in: posts.map((post) => post._id) },
      state: {
        $in: [
          ShoppingState.CONSTRUCTION,
          ShoppingState.REQUESTED,
          ShoppingState.APPROVED,
          ShoppingState.PROCESSING,
          ShoppingState.READY_TO_DELIVER,
        ],
      },
    },
  });

  const out = await Promise.all(
    posts.map((post) => getStockAmountAvailableFromPost({ post, shoppings: allShoppings })),
  );

  return out;
};

const sendUpdateStockAmountMessagesFromShoppingPosts: QueryHandle<{
  shopping: Shopping;
}> = async ({ shopping }) => {
  if (
    ![ShoppingState.REJECTED, ShoppingState.CANCELED, ShoppingState.CONSTRUCTION].includes(
      shopping.state,
    )
  ) {
    logger.info('No need to send update stock amount messages from shopping posts.');
    return;
  }

  const posts = await postServices.getAll({
    query: {
      postsIds: shopping.posts.map((post) => post.postData._id.toString()),
    },
  });

  const amountAvailableFromPosts = await getStockAmountAvailableFromPosts({
    posts,
  });

  amountAvailableFromPosts.forEach((stockAmountAvailable, index) => {
    if (isNumber(stockAmountAvailable)) {
      notificationsServices.sendUpdateStockAmountMessage({
        postId: posts[index]._id.toString(),
        stockAmountAvailable,
      });
    }
  });
};

const decrementStockAmountFromShoppingPosts: QueryHandle<{
  shopping: Shopping;
}> = async ({ shopping }) => {
  if (![ShoppingState.DELIVERED].includes(shopping.state)) {
    logger.info('No need to decrement stock amount from shopping posts.');
    return;
  }

  /**
   * TODO this can be improved
   */
  const promises = shopping.posts.map(({ count, postData }) => {
    return new Promise<void>((resolve) => {
      postServices
        .getOne({
          query: {
            _id: postData._id,
          },
        })
        .then((post) => {
          if (post && isNumber(post.stockAmount)) {
            post.updateOne({ $inc: { stockAmount: -count } }).then(() => {
              resolve();
            });
          } else {
            resolve();
          }
        });
    });
  });

  await Promise.all(promises);
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
  //
  getStockAmountAvailableFromPost,
  getStockAmountAvailableFromPosts,
  sendUpdateStockAmountMessagesFromShoppingPosts,
  decrementStockAmountFromShoppingPosts,
};
