import { ServerResponse } from 'http';
import { QueryHandle } from '../../types/general';
import { Shopping } from '../../types/shopping';
import { User } from '../../types/user';
import { logger } from '../logger';
import { shoppingServices } from './services';
import { isEqualIds } from '../../utils/general';
import { postServices } from '../post/services';
import { sendUpdateStockAmountMessage } from '../notifications/handles';
import { addPostToReq } from '../../middlewares/verify';

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
}> = async ({ postId, res, req, routeName, user }) => {
  const post = await postServices.getOne({
    req,
    res,
    postId,
  });

  if (post instanceof ServerResponse) return post;

  ////////////////////////////////////////////////////////////////////////////////////
  const oldShopping = await shoppingServices.findAndUpdateOne({
    res,
    req,
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
    return res.send({});
  }

  if (oldShopping.posts.length === 1) {
    /**
     * si tenia 1 elemento, el cual ya fuel eliminado en el paso anterior entonces debe ser eliminada la shooping
     */
    await shoppingServices.deleteOne({
      res,
      req,
      query: {
        _id: oldShopping._id,
      },
    });
  }

  const shoppingPostToUpdate = oldShopping.posts.find((p) => {
    return isEqualIds(p.post._id, postId);
  });

  const updateStockResponse = await postServices.updateStockAmount({
    req,
    res,
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
    sendUpdateStockAmountMessage({ req, res, postId, currentStockAmount });
  }

  return res.send({});
};

export const deleteShopping: QueryHandle<{
  routeName: string;
  user: User;
}> = async ({ res, req, routeName }) => {
  const oldShopping = await shoppingServices.findOneAndDelete({
    res,
    req,
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
            res,
            req,
            postId,
          })
          .then((post) => {
            if (post instanceof ServerResponse) {
              return resolve(post);
            }

            req.post = post;
            postServices
              .updateStockAmount({
                req,
                res,
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
                    req,
                    res,
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

  res.send({});
};
