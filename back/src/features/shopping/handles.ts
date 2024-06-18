import { AnyRecord, RequestHandler } from '../../types/general';
import { withTryCatch } from '../../utils/error';

import {
  get400Response,
  getBusinessNotFoundResponse,
  getPostNotFoundResponse,
  getShoppingNotFoundResponse,
  getUserNotFoundResponse,
} from '../../utils/server-response';
import { shoppingServices } from './services';
import { postServices } from '../post/services';
import { isNumber } from '../../utils/general';
import { businessServices } from '../business/services';
import {
  deleteOnePostFromShoppingInContruction,
  deleteShoppingInConstruction,
  getShoppingInfo,
} from './utils';
import { logger } from '../logger';
import { PostPurshaseNotes } from '../../types/post';
import { ShoppingModel } from '../../schemas/shopping';
import { sendNewOrderTelegramMessage } from '../telegram/handles';
import { sendNewOrderPushMessage, sendUpdateStockAmountMessage } from '../notifications/handles';
import { ShoppingState } from '../../types/shopping';

const get_shopping: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { query, user, paginateOptions } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { routeName } = query;

      const out = await shoppingServices.getAllWithPagination({
        paginateOptions,
        query: {
          routeName,
          purchaserId: user._id,
        },
      });

      res.send(out);
    });
  };
};

const get_shopping_owner: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { business, query, paginateOptions } = req;

      if (!business) {
        return getBusinessNotFoundResponse({ res });
      }

      const { routeName } = business;
      const { states } = query;

      const out = await shoppingServices.getAllWithPagination({
        paginateOptions,
        query: {
          routeName,
          states,
        },
      });

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
        query: {
          _id: shoppingId,
          purchaserId: user._id,
        },
      });

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
        amountToAdd: -amountToAdd,
        post,
      });

      /**
       * update the shopping with the new amount according to amount added to post.
       * updateStockResponse is null if the stock amount fearure is not enabled
       */

      const { amountAddedToPost, currentStockAmount } = updateStockResponse || {};

      if (isNumber(amountAddedToPost) && isNumber(currentStockAmount)) {
        await shoppingServices.updateOrAddOne({
          amountToAdd: -amountAddedToPost,
          post,
          user,
        });

        /**
         * send notification to update the post. TODO maybe we need some conditions
         */
        sendUpdateStockAmountMessage({ postId: post._id.toString(), currentStockAmount });

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
        amountToAdd,
        purshaseNotes,
        post,
        user,
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

      const shopping = await shoppingServices.findAndUpdateOne({
        query: {
          _id: shoppingId,
          purchaserId: user._id,
        },
        update: {
          state: 'REQUESTED',
        },
      });

      if (!shopping) {
        logger.error('It is weird, maybe there is a bug');
        return res.send({});
      }

      const business = await businessServices.findOne({
        query: {
          routeName: shopping.routeName,
        },
      });

      if (!business) {
        return getBusinessNotFoundResponse({ res });
      }

      /**
       * compute payment and reduce de credit with this product
       */

      const { shoppingDebit } = getShoppingInfo(shopping);

      await businessServices.updateOne({
        query: {
          routeName: shopping.routeName,
        },
        update: {
          $inc: {
            'shoppingPayment.totalDebit': shoppingDebit,
          },
          $push: {
            'shoppingPayment.requests': {
              shoppingId: shopping._id,
              shoppingDebit,
            },
          },
        },
      });

      /**
       * send Telegram message
       */

      sendNewOrderTelegramMessage({ business, shopping });
      sendNewOrderPushMessage({ business, shopping });

      res.send({});
    });
  };
};

const post_shopping_shoppingId_change_state: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { user } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { params, body } = req;

      const { shoppingId } = params;

      const state: ShoppingState = body.state;

      if (state === 'CONSTRUCTION') {
        return get400Response({
          res,
          json: { message: 'Can not change the state to CONSTRUCTION' },
        });
      }

      const shopping = await ShoppingModel.findOne({
        _id: shoppingId,
      });

      if (!shopping) {
        return getShoppingNotFoundResponse({ res });
      }

      if (shopping.state === 'CONSTRUCTION') {
        return get400Response({
          res,
          json: { message: 'Can not change the state from CONSTRUCTION' },
        });
      }

      if (shopping?.history) {
        shopping.history.push({
          state: shopping.state,
          lastUpdatedDate: new Date(),
        });
      } else {
        shopping.history = [
          {
            state: shopping.state,
            lastUpdatedDate: new Date(),
          },
        ];
      }

      shopping.state = state;

      await shopping.save();

      res.send({});
    });
  };
};

const delete_shopping: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { user, body } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { routeName, postId } = body;

      postId
        ? await deleteOnePostFromShoppingInContruction({ routeName, user, postId })
        : await deleteShoppingInConstruction({ routeName, user });

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
