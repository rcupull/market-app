import { ServerResponse } from 'http';
import { QueryHandle } from '../../types/general';
import { Shopping } from '../../types/shopping';
import { User } from '../../types/user';
import { logger } from '../logger';
import { shoppingServices } from './services';
import { isEqualIds } from '../../utils/general';
import { postServices } from '../post/services';
import { sendUpdateStockAmountMessage } from '../notifications/handles';

export const getDebitFromOrder = ({
  order,
}: {
  order: Shopping;
}): {
  debit: number;
} => {
  const orderMoney = order.posts.reduce((amount, { count, post }) => {
    if (!post.price) {
      return amount;
    }

    if (post.currency !== 'CUP') {
      logger.info('not cup'); //TODO not cup
      return amount;
    }

    return amount + post.price * count; //TODO agregar conversion de moneda su es USD
  }, 0);

  const moneyToPay = orderMoney * 0.01; //el 1% de las ventas es de la app

  return {
    debit: moneyToPay,
  };
};

export const deleteOnePostFromShopping: QueryHandle<{
  routeName: string;
  postId: string;
  user: User;
}> = async ({ postId, routeName, user }) => {
  const post = await postServices.getOne({
    postId,
  });

  if (post instanceof ServerResponse) {
    return post;
  }

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
          'post._id': postId,
        },
      },
    },
  });

  if (oldShopping instanceof ServerResponse) return oldShopping;

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
    return isEqualIds(p.post._id, postId);
  });

  const updateStockResponse = await postServices.updateStockAmount({
    amountToAdd: shoppingPostToUpdate?.count ?? 0,
    post,
  });

  if (updateStockResponse instanceof ServerResponse) {
    return updateStockResponse;
  }

  /**
   * push Notification to update the stock in  the front
   */
  if (updateStockResponse) {
    const { currentStockAmount } = updateStockResponse;
    sendUpdateStockAmountMessage({ postId, currentStockAmount });
  }
};

export const deleteShopping: QueryHandle<{
  routeName: string;
  user: User;
}> = async ({ routeName }) => {
  const oldShopping = await shoppingServices.findOneAndDelete({
    query: {
      state: 'CONSTRUCTION',
      routeName,
    },
  });

  if (oldShopping instanceof ServerResponse) return oldShopping;

  if (oldShopping) {
    const promises = oldShopping.posts.map(({ post: { _id: postId }, count }) => {
      return new Promise((resolve) => {
        postServices
          .getOne({
            postId,
          })
          .then((post) => {
            if (post instanceof ServerResponse) {
              return resolve(post);
            }

            if (!post) {
              return resolve(null);
            }

            postServices
              .updateStockAmount({
                amountToAdd: count,
                post,
              })
              .then((updateStockResponse) => {
                if (updateStockResponse instanceof ServerResponse) {
                  return resolve(updateStockResponse);
                }

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
