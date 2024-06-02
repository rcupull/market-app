import { AnyRecord, RequestHandler } from '../../types/general';
import { withTryCatch } from '../../utils/error';
import { ServerResponse } from 'http';
import {
  getBusinessNotFoundResponse,
  getPostNotFoundResponse,
  getShoppingNotFoundResponse,
  getUserNotFoundResponse,
} from '../../utils/server-response';
import { shoppingServices } from './services';
import { postServices } from '../post/services';
import { isEqualIds, isNumber } from '../../utils/general';
import { notificationsServices } from '../notifications';
import { businessServices } from '../business/services';
import { computePay } from './utils';
import { logger } from '../logger';
import { PostPurshaseNotes } from '../../types/post';
import { ShoppingModel } from '../../schemas/shopping';
import { Business } from '../../types/business';
import { telegramServices } from '../telegram';

const get_shopping: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { query, user } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { routeName } = query;

      const out = await shoppingServices.getAll({
        req,
        res,
        query: {
          purchaserId: user._id,
          'posts.post.routeName': routeName,
        },
      });

      if (out instanceof ServerResponse) return out;

      res.send(out);
    });
  };
};

const get_shopping_owner: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { business, query } = req;

      if (!business) {
        return getBusinessNotFoundResponse({ res });
      }

      const { routeName } = business;
      const { states } = query;

      const out = await shoppingServices.getAll({
        req,
        res,
        query: {
          'posts.post.routeName': routeName,
          ...(states ? { state: { $in: states } } : {}),
        },
      });

      if (out instanceof ServerResponse) return out;

      res.send(out);
    });
  };
};

const get_shopping_shoppingId: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params, user } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { shoppingId } = params;

      const out = await shoppingServices.getOne({
        req,
        res,
        query: {
          _id: shoppingId,
          purchaserId: user._id,
        },
      });

      if (out instanceof ServerResponse) return out;

      res.send(out);
    });
  };
};

const post_shopping: () => RequestHandler<
  AnyRecord,
  any,
  {
    purshaseNotes?: PostPurshaseNotes;
    amountToAdd?: number;
  }
> = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { user, post } = req;
      //

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      if (!post) {
        return getPostNotFoundResponse({ res });
      }

      const { body } = req;

      const { amountToAdd = 1, purshaseNotes } = body;

      /**
       * Update the post stock in the case that it has enabled this features
       * this service return the amount added to the post and the current stock
       */
      const updateStockResponse = await postServices.updateStockAmount({
        req,
        res,
        amountToAdd: -amountToAdd,
      });

      if (updateStockResponse instanceof ServerResponse) {
        return updateStockResponse;
      }

      /**
       * update the shopping with the new amount according to amount added to post.
       * updateStockResponse is null if the stock amount fearure is not enabled
       */

      const { amountAddedToPost, currentStockAmount } = updateStockResponse || {};

      if (isNumber(amountAddedToPost) && isNumber(currentStockAmount)) {
        await shoppingServices.updateOrAddOne({
          req,
          res,
          amountToAdd: -amountAddedToPost,
        });

        /**
         * send notification to update the post. TODO maybe we need some conditions
         */
        await notificationsServices.sendNotificationToUpdate({
          res,
          req,
          payload: {
            type: 'POST_AMOUNT_STOCK_CHANGE',
            stockAmount: currentStockAmount,
            postId: post._id.toString(),
          },
        });

        if (amountAddedToPost !== amountToAdd) {
          return res.send({
            message:
              'Por falta de disponibilidad en el stock no se han podido agregar la cantidad solicitada. Se han agregado solamente las cantidades disponibles.',
          });
        }

        return res.send({});
      }

      /**
       * The purshaseNotes is added only when the purshase is created
       */
      await shoppingServices.updateOrAddOne({
        req,
        res,
        amountToAdd,
        purshaseNotes,
      });

      res.send({});
    });
  };
};

const post_shopping_shoppingId_make_order: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const user = req.user;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { params } = req;

      const { shoppingId } = params;

      const order = await shoppingServices.findAndUpdateOne({
        req,
        res,
        query: {
          _id: shoppingId,
          purchaserId: user._id,
        },
        update: {
          state: 'REQUESTED',
        },
      });

      if (order instanceof ServerResponse) return order;

      if (!order) {
        logger.error('It is weird, maybe there is a bug');
        return res.send({});
      }

      const business:
        | Pick<Business, 'shoppingPayment' | 'name' | 'telegramBotChat'>
        | ServerResponse = await businessServices.findOne({
        res,
        req,
        query: {
          routeName: order.routeName,
        },
        projection: {
          shoppingPayment: 1,
          telegramBotChat: 1,
          name: 1,
        },
      });

      if (business instanceof ServerResponse) return business;

      /**
       * compute payment and reduce de credit with this product
       */
      const { fromCredit, toPay, newCredit } = computePay({
        currentCredit: business.shoppingPayment.credit,
        order,
      });

      await businessServices.updateOne({
        res,
        req,
        query: {
          routeName: order.routeName,
        },
        update: {
          'shoppingPayment.credit': newCredit,
          $push: {
            'shoppingPayment.requests': {
              shoppingId: order._id,
              fromCredit,
              toPay,
            },
          },
        },
      });

      /**
       * send whatsapp message
       */

      if (business.telegramBotChat) {
        telegramServices.sendMessage(
          business.telegramBotChat.chatId,
          `Una nueva orden de compra ha sido solicitada en su negocio "${business.name}" de nuestra plataforma Asere Market. Puede ver los detalles en la sección de órdenes de compras.`
        );
      } else {
        logger.warn(`the business ${business.name} has not a activated telegram account`);
      }

      res.send({});
    });
  };
};

const post_shopping_shoppingId_change_state: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const user = req.user;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { params, body } = req;

      const { shoppingId } = params;
      const { state } = body;

      const currentOrder = await ShoppingModel.findOne({
        _id: shoppingId,
        purchaserId: user._id,
      });

      if (!currentOrder) {
        return getShoppingNotFoundResponse({ res });
      }

      if (currentOrder?.history) {
        currentOrder.history.push({
          state: currentOrder.state,
          lastUpdatedDate: new Date(),
        });
      } else {
        currentOrder.history = [
          {
            state: currentOrder.state,
            lastUpdatedDate: new Date(),
          },
        ];
      }

      currentOrder.state = state;

      await currentOrder.save();

      res.send({});
    });
  };
};

const delete_shopping: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { user } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { body } = req;

      const { routeName, postId } = body;

      if (postId) {
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
        });

        if (updateStockResponse instanceof ServerResponse) {
          return updateStockResponse;
        }

        /**
         * push Notification to update the stock in  the front
         */
        if (updateStockResponse) {
          await notificationsServices.sendNotificationToUpdate({
            res,
            req,
            payload: {
              type: 'POST_AMOUNT_STOCK_CHANGE',
              stockAmount: updateStockResponse.currentStockAmount,
              postId,
            },
          });
        }

        return res.send({});
      }

      /**
       * Delete the whole shopping
       */
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
                  })
                  .then((updateStockResponse) => {
                    if (updateStockResponse instanceof ServerResponse) {
                      return resolve(updateStockResponse);
                    }

                    if (updateStockResponse) {
                      const { currentStockAmount } = updateStockResponse;

                      notificationsServices
                        .sendNotificationToUpdate({
                          req,
                          res,
                          payload: {
                            type: 'POST_AMOUNT_STOCK_CHANGE',
                            stockAmount: currentStockAmount,
                            postId: post._id.toString(),
                          },
                        })
                        .then(() => {
                          resolve(null);
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
    });
  };
};

export const shoppingHandles = {
  get_shopping,
  post_shopping,
  delete_shopping,
  get_shopping_shoppingId,
  post_shopping_shoppingId_make_order,
  post_shopping_shoppingId_change_state,
  //
  get_shopping_owner,
};
