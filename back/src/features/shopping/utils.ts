import { QueryHandle } from '../../types/general';
import { Shopping, ShoppingPostData, ShoppingState } from '../../types/shopping';
import { User } from '../../types/user';
import { logger } from '../logger';
import {
  shoppingServicesDeleteOne,
  shoppingServicesFindAndUpdateOne,
  shoppingServicesFindOneAndDelete,
  shoppingServicesGetDataFromPosts,
} from './services';
import { isEmpty, isNumber } from '../../utils/general';
import { postServicesGetAll, postServicesGetOne } from '../post/services';
import { makeReshaper } from '../../utils/makeReshaper';
import { Post } from '../../types/post';
import { FilterQuery, Schema } from 'mongoose';
import { setFilterQueryWithDates } from '../../utils/schemas';
import { notificationsServicesSendUpdateStockAmountMessage } from '../notifications/services';

export interface GetAllShoppingArgs extends FilterQuery<Shopping> {
  routeNames?: Array<string>;
  states?: Array<ShoppingState>;
  shoppingIds?: Array<string | Schema.Types.ObjectId>;
  excludeShoppingIds?: Array<string | Schema.Types.ObjectId>;
  dateFrom?: string;
  dateTo?: string;
}

export const deleteOnePostFromShoppingInContruction: QueryHandle<{
  routeName: string;
  postId: string;
  user: User;
}> = async ({ postId, routeName, user }) => {
  const post = await postServicesGetOne({
    query: {
      _id: postId,
    },
  });

  if (!post) {
    logger.info('post not found');
    return;
  }

  ////////////////////////////////////////////////////////////////////////////////////
  const oldShopping = await shoppingServicesFindAndUpdateOne({
    query: {
      state: 'CONSTRUCTION',
      routeName,
      purchaserId: user._id,
    },
    update: {
      $pull: {
        posts: {
          'postData._id': postId,
        },
      },
    },
  });

  if (!oldShopping) {
    logger.info('oldShopping not found');
    return;
  }

  if (oldShopping.posts.length === 1) {
    /**
     * si tenia 1 elemento, el cual ya fuel eliminado en el paso anterior entonces debe ser eliminada la shooping
     */
    await shoppingServicesDeleteOne({
      query: {
        _id: oldShopping._id,
      },
    });
  }

  /**
   * push Notification to update the stock in  the front
   */
  const { getPostData } = await shoppingServicesGetDataFromPosts({
    posts: [post],
  });

  const { stockAmountAvailable } = getPostData(post);

  if (isNumber(stockAmountAvailable)) {
    notificationsServicesSendUpdateStockAmountMessage({
      postId: post._id.toString(),
      stockAmountAvailable,
    });
  }
};

export const deleteShoppingInConstruction: QueryHandle<{
  routeName: string;
  user: User;
}> = async ({ routeName }) => {
  const oldShopping = await shoppingServicesFindOneAndDelete({
    query: {
      state: 'CONSTRUCTION',
      routeName,
    },
  });

  if (oldShopping) {
    const posts = await postServicesGetAll({
      query: {
        postsIds: oldShopping.posts.map((p) => p.postData._id.toString()),
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
  }
};

export const postToShoppingPostDataReshaper = makeReshaper<Post, ShoppingPostData>({
  _id: '_id',
  price: 'price',
  images: 'images',
  name: 'name',
});

export const getAllShoppingFilterQuery = (args: GetAllShoppingArgs): FilterQuery<Shopping> => {
  const { routeNames, states, dateFrom, dateTo, shoppingIds, excludeShoppingIds, ...omittedQuery } =
    args;

  const filterQuery: FilterQuery<Shopping> = omittedQuery;
  filterQuery.$and = [];

  if (shoppingIds?.length) {
    filterQuery.$and.push({ _id: { $in: shoppingIds } });
  }

  if (excludeShoppingIds?.length) {
    filterQuery.$and.push({ _id: { $nin: excludeShoppingIds } });
  }

  if (routeNames?.length) {
    filterQuery.routeName = { $in: routeNames };
  }

  if (states?.length) {
    filterQuery.state = { $in: states };
  }

  setFilterQueryWithDates({ filterQuery, dateFrom, dateTo });

  if (isEmpty(filterQuery.$and)) {
    delete filterQuery.$and;
  }

  return filterQuery;
};

export const getShoppingInfo = (
  shopping: Shopping
): {
  totalProducts: number;
  totalPrice: number;
  shoppingDebit: number;
} => {
  const { posts } = shopping;

  let totalProducts = 0;
  let totalPrice = 0;

  posts.forEach(({ count, postData }) => {
    if (!postData.price || !isNumber(postData.price)) {
      console.log('not price number');
      return;
    }

    totalProducts = totalProducts + count;
    totalPrice = totalPrice + postData.price * count;
  });

  return {
    totalProducts,
    totalPrice,
    shoppingDebit: totalPrice * 0.01, //el 1% de las ventas es de la app
  };
};

export const getShoppingsTotalDebit = (shoppings: Array<Shopping>): number => {
  const totalDebit = shoppings.reduce((acc, order) => {
    const { shoppingDebit } = getShoppingInfo(order);
    return acc + shoppingDebit;
  }, 0);

  return parseFloat(totalDebit.toFixed(2));
};
