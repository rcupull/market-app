import { QueryHandle } from '../../types/general';
import { Shopping, ShoppingPostData, ShoppingState } from '../../types/shopping';
import { User } from '../../types/user';
import { logger } from '../logger';
import { shoppingServices } from './services';
import { isEqualIds, isNumber } from '../../utils/general';
import { postServices } from '../post/services';
import { sendUpdateStockAmountMessage } from '../notifications/handles';
import { makeReshaper } from '../../utils/makeReshaper';
import { Post } from '../../types/post';
import { FilterQuery } from 'mongoose';
import { setFilterQueryWithDates } from '../../utils/schemas';

export interface GetAllShoppingArgs extends FilterQuery<Shopping> {
  routeNames?: Array<string>;
  states?: Array<ShoppingState>;
  shoppingIds?: Array<string>;
  dateFrom?: string;
  dateTo?: string;
}

export const deleteOnePostFromShoppingInContruction: QueryHandle<{
  routeName: string;
  postId: string;
  user: User;
}> = async ({ postId, routeName, user }) => {
  const post = await postServices.getOne({
    postId,
  });

  if (!post) {
    logger.info('post not found');
    return;
  }

  ////////////////////////////////////////////////////////////////////////////////////
  const oldShopping = await shoppingServices.findAndUpdateOne({
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
    await shoppingServices.deleteOne({
      query: {
        _id: oldShopping._id,
      },
    });
  }

  const shoppingPostToUpdate = oldShopping.posts.find((p) => {
    return isEqualIds(p.postData._id, postId);
  });

  const updateStockResponse = await postServices.updateStockAmount({
    amountToAdd: shoppingPostToUpdate?.count ?? 0,
    post,
  });

  /**
   * push Notification to update the stock in  the front
   */
  if (updateStockResponse) {
    const { currentStockAmount } = updateStockResponse;
    sendUpdateStockAmountMessage({ postId, currentStockAmount });
  }
};

export const deleteShoppingInConstruction: QueryHandle<{
  routeName: string;
  user: User;
}> = async ({ routeName }) => {
  const oldShopping = await shoppingServices.findOneAndDelete({
    query: {
      state: 'CONSTRUCTION',
      routeName,
    },
  });

  if (oldShopping) {
    const promises = oldShopping.posts.map(({ postData: { _id: postId }, count }) => {
      return new Promise((resolve) => {
        postServices
          .getOne({
            postId,
          })
          .then((post) => {
            if (!post) {
              return resolve(null);
            }

            postServices
              .updateStockAmount({
                amountToAdd: count,
                post,
              })
              .then((updateStockResponse) => {
                if (updateStockResponse) {
                  const { currentStockAmount } = updateStockResponse;
                  sendUpdateStockAmountMessage({
                    postId: post._id.toString(),
                    currentStockAmount,
                  });
                }

                resolve(null);
              });
          });
      });
    });

    await Promise.all(promises);
  }
};

export const postToShoppingPostDataReshaper = makeReshaper<Post, ShoppingPostData>({
  _id: '_id',
  price: 'price',
  images: 'images',
  name: 'name',
});

export const getAllShoppingFilterQuery = (args: GetAllShoppingArgs): FilterQuery<Shopping> => {
  const { routeNames, states, dateFrom, dateTo, shoppingIds, ...omittedQuery } = args;

  const filterQuery: FilterQuery<Shopping> = omittedQuery;

  if (shoppingIds?.length) {
    filterQuery._id = { $in: shoppingIds };
  }

  if (routeNames?.length) {
    filterQuery.routeName = { $in: routeNames };
  }

  if (states?.length) {
    filterQuery.state = { $in: states };
  }

  setFilterQueryWithDates({ filterQuery, dateFrom, dateTo });

  return filterQuery;
};

export const getShoppingInfo = (
  shopping: Shopping,
): {
  totalProducts: number;
  totalPrice: number;
  shoppingDebit: number;
} => {
  const { posts } = shopping;

  let totalProducts = 0;
  let totalPrice = 0;

  posts.forEach(({ count, postData }) => {
    if (!isNumber(postData.price)) {
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
