import { ModelDocument, QueryHandle } from '../../types/general';
import { FilterQuery, PaginateOptions, ProjectionType, UpdateQuery } from 'mongoose';
import { UpdateOptions } from 'mongodb';
import { ShoppingModel } from '../../schemas/shopping';
import { Shopping, ShoppingState } from '../../types/shopping';
import { Post, PostPurshaseNotes } from '../../types/post';
import { isEqual, isEqualIds, isNullOrUndefined, isNumber } from '../../utils/general';
import { User } from '../../types/user';
import { PaginateResult } from '../../middlewares/middlewarePagination';
import {
  GetAllShoppingArgs,
  getAllShoppingFilterQuery,
  postToShoppingPostDataReshaper,
} from './utils';
import { getSortQuery } from '../../utils/schemas';
import { Business } from '../../types/business';
import { postServicesGetAll, postServicesGetOne } from '../post/services';
import { logger } from '../logger';
import { notificationsServicesSendUpdateStockAmountMessage } from '../notifications/services';
import { agendaServices } from '../agenda/services';
import { businessServicesFindOne } from '../business/services';

export const shoppingServicesAddOne: QueryHandle<
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
    await businessServicesFindOne({
      query: {
        routeName,
      },
      projection: {
        currency: 1,
      },
    });

  if (!businessData) return null;

  const newShopping = new ShoppingModel({
    state: ShoppingState.CONSTRUCTION,
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

export const shoppingServicesAddPostToOne: QueryHandle<
  {
    amountToAdd?: number;
    post: Post;
    currentShopping: ModelDocument<Shopping>;
    purshaseNotes?: PostPurshaseNotes;
  },
  void
> = async ({ amountToAdd = 1, post, currentShopping, purshaseNotes }) => {
  const { _id: postId } = post;

  const existsIndex = currentShopping.posts.findIndex((p) => {
    return isEqualIds(p.postData._id, postId) && isEqual(p.purshaseNotes, purshaseNotes);
  });

  if (existsIndex >= 0) {
    currentShopping.posts[existsIndex].lastUpdatedDate = new Date();
    currentShopping.posts[existsIndex].count += amountToAdd;
  } else {
    currentShopping.posts.push({
      //@ts-expect-error ignore
      postData: postToShoppingPostDataReshaper(post),
      lastUpdatedDate: new Date(),
      count: amountToAdd,
      purshaseNotes,
    });
  }

  await currentShopping.save();
};

export const shoppingServicesUpdateOrAddOne: QueryHandle<
  {
    amountToAdd: number | undefined;
    purshaseNotes: PostPurshaseNotes | undefined;
    user: User;
    post: Post;
  },
  void
> = async ({ amountToAdd = 1, purshaseNotes, user, post }) => {
  const { routeName } = post;

  const existInConstruction = await ShoppingModel.findOne({
    purchaserId: user._id,
    state: ShoppingState.CONSTRUCTION,
    routeName: routeName,
  });

  if (existInConstruction) {
    await shoppingServicesAddPostToOne({
      amountToAdd,
      post,
      purshaseNotes,
      currentShopping: existInConstruction,
    });
    await agendaServices.scheduleRemoveOrderInConstruction({
      orderId: existInConstruction._id.toString(),
    });
  } else {
    const shopping = await shoppingServicesAddOne({ amountToAdd, purshaseNotes, user, post });

    if (!shopping) return;

    await agendaServices.scheduleRemoveOrderInConstruction({ orderId: shopping._id.toString() });
  }
};

export const shoppingServicesGetAllWithPagination: QueryHandle<
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

export const shoppingServicesGetAll: QueryHandle<
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

export const shoppingServicesGetOne: QueryHandle<
  {
    query: FilterQuery<Shopping>;
  },
  ModelDocument<Shopping> | null
> = async ({ query }) => {
  const out = await ShoppingModel.findOne(query);

  return out;
};

export const shoppingServicesUpdateOne: QueryHandle<
  {
    query: FilterQuery<Shopping>;
    update: UpdateQuery<Shopping>;
    options?: UpdateOptions;
  },
  void
> = async ({ query, update, options }) => {
  await ShoppingModel.updateOne(query, update, options);
};

export const shoppingServicesUpdateMany: QueryHandle<
  {
    query: FilterQuery<Shopping>;
    update: UpdateQuery<Shopping>;
    options?: UpdateOptions;
  },
  void
> = async ({ query, update, options }) => {
  await ShoppingModel.updateMany(query, update, options);
};

export const shoppingServicesFindAndUpdateOne: QueryHandle<
  {
    query: FilterQuery<Shopping>;
    update: UpdateQuery<Shopping>;
  },
  Shopping | null
> = async ({ query, update }) => {
  return await ShoppingModel.findOneAndUpdate(query, update);
};

export const shoppingServicesDeleteOne: QueryHandle<
  {
    query: FilterQuery<Shopping>;
  },
  void
> = async ({ query }) => {
  await ShoppingModel.deleteOne(query);
};

export const shoppingServicesDeleteMany: QueryHandle<
  {
    query: FilterQuery<Shopping>;
  },
  void
> = async ({ query }) => {
  await ShoppingModel.deleteMany(query);
};

export const shoppingServicesFindOneAndDelete: QueryHandle<
  {
    query: FilterQuery<Shopping>;
  },
  Shopping | null
> = async ({ query }) => {
  return await ShoppingModel.findOneAndDelete(query);
};

export const shoppingServicesGetDataFromPosts: QueryHandle<
  {
    posts: Array<Post>;
  },
  {
    getPostData: (post: Post) => {
      amountInProcess: number;
      stockAmountAvailable: number | null;
    };
  }
> = async ({ posts }) => {
  /**
   * shopping que tienen estos productos incluidos pero todavia no han sido vendidos. O sea, existen en los almacenes del comerciante
   * El stockAmount de los posts sera decrementado una vez se haya vendido y entregado el producto (cambia para ShoppingState.DELIVERED)*/
  const allShoppings = await shoppingServicesGetAll({
    query: {
      'posts.postData._id': { $in: posts.map((post) => post._id) },
      state: {
        $in: [
          ShoppingState.CONSTRUCTION,
          ShoppingState.REQUESTED,
          ShoppingState.APPROVED,
          ShoppingState.PROCESSING,
        ],
      },
    },
  });

  return {
    getPostData: (post: Post) => {
      const { stockAmount } = post;
      const amountInProcess = allShoppings.reduce((acc, shopping) => {
        let out = acc;
        shopping.posts.forEach(({ count, postData }) => {
          if (isEqualIds(postData._id, post._id)) {
            out = out + count;
          }
        });

        return out;
      }, 0);

      return {
        amountInProcess,
        stockAmountAvailable: isNullOrUndefined(stockAmount) ? null : stockAmount - amountInProcess,
      };
    },
  };
};

export const shoppingServicesSendUpdateStockAmountMessagesFromShoppingPosts: QueryHandle<{
  shopping: Shopping;
}> = async ({ shopping }) => {
  if (
    ![ShoppingState.REJECTED, ShoppingState.CANCELED, ShoppingState.CONSTRUCTION].includes(
      shopping.state
    )
  ) {
    logger.info('No need to send update stock amount messages from shopping posts.');
    return;
  }

  const posts = await postServicesGetAll({
    query: {
      postsIds: shopping.posts.map((post) => post.postData._id.toString()),
    },
  });

  const { getPostData } = await shoppingServicesGetDataFromPosts({
    posts,
  });

  posts.forEach((post) => {
    const { stockAmountAvailable } = getPostData(post);

    if (isNumber(stockAmountAvailable)) {
      notificationsServicesSendUpdateStockAmountMessage({
        postId: post._id.toString(),
        stockAmountAvailable,
      });
    }
  });
};

export const shoppingServicesDecrementStockAmountFromShoppingPosts: QueryHandle<{
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
      postServicesGetOne({
        query: {
          _id: postData._id,
        },
      }).then((post) => {
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
