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
import { isNumber } from '../../utils/general';
import { businessServices } from '../business/services';
import {
  deleteOnePostFromShoppingInContruction,
  deleteShoppingInConstruction,
} from './utils';
import { logger } from '../logger';
import { PostPurshaseNotes } from '../../types/post';
import { ShoppingModel } from '../../schemas/shopping';
import { sendNewOrderTelegramMessage } from '../telegram/handles';
import { ShoppingState } from '../../types/shopping';
import { telegramServices } from '../telegram/services';
import { userServices } from '../user/services';
import { User } from '../../types/user';
import { getShoppingUrl } from '../../utils/web';
import { Business } from '../../types/business';
import { defaultQuerySort } from '../../utils/api';
import { notificationsServices } from '../notifications/services';

const get_shopping: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { query, user, paginateOptions } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { routeName, sort = defaultQuerySort } = query;

      const out = await shoppingServices.getAllWithPagination({
        paginateOptions,
        sort,
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

      const [stockAmountAvailable] = await shoppingServices.getStockAmountAvailableFromPosts({
        posts: [post],
      });

      if (isNumber(stockAmountAvailable)) {
        /**
         * is enabled the stock amount feature
         */
        const wantAddMore = amountToAdd > stockAmountAvailable;

        if (wantAddMore) {
          /**
           * add the rest of the stock
           */
          await shoppingServices.updateOrAddOne({
            amountToAdd: stockAmountAvailable,
            post,
            user,
          });

          /**
           * send notification to update the post. TODO maybe we need some conditions
           */
          notificationsServices.sendUpdateStockAmountMessage({
            postId: post._id.toString(),
            stockAmountAvailable: 0,
          });

          return res.send({
            message:
              'Por falta de disponibilidad en el stock no se han podido agregar la cantidad solicitada. Se han agregado solamente las cantidades disponibles.',
          });
        }

        /**
         * add the amount to add
         */
        await shoppingServices.updateOrAddOne({
          amountToAdd: amountToAdd,
          post,
          user,
        });

        /**
         * send notification to update the post. TODO maybe we need some conditions
         */
        notificationsServices.sendUpdateStockAmountMessage({
          postId: post._id.toString(),
          stockAmountAvailable: stockAmountAvailable - amountToAdd,
        });

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
       * send Telegram message
       */

      sendNewOrderTelegramMessage({ business, shopping });
      notificationsServices.sendNewOrderPushMessage({ business, shopping });

      res.send({});
    });
  };
};

const post_shopping_shoppingId_change_state: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
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

      if (state === ShoppingState.APPROVED) {
        /**
         * send telegram notificaion when the shopping to be aproved
         */
        const purchaserData: Pick<User, 'telegramBotChat'> | null = await userServices.getOne({
          query: {
            _id: shopping.purchaserId,
          },
          projection: {
            telegramBotChat: 1,
          },
        });

        if (!purchaserData) {
          return getUserNotFoundResponse({
            res,
          });
        }

        const businessData: Pick<Business, 'name'> | null = await businessServices.findOne({
          query: {
            routeName: shopping.routeName,
          },
          projection: {
            name: 1,
          },
        });

        if (!businessData) {
          return getBusinessNotFoundResponse({
            res,
          });
        }

        if (purchaserData.telegramBotChat) {
          telegramServices.sendMessage(
            purchaserData.telegramBotChat.chatId,
            `Una orden de compra generada por usted en el negocio <b>${businessData.name}</b> ha sido aprovada. Usted será contactado luego por el vendedor para los detalles de la entrega.`,
            {
              parse_mode: 'HTML',
            },
          );

          const shoppingLink = getShoppingUrl({
            routeName: shopping.routeName,
            shoppingId: shopping._id.toString(),
          });

          telegramServices.sendMessage(
            purchaserData.telegramBotChat.chatId,
            `<a href='${shoppingLink}'>Ver detalles de la orden de compra</a>`,
            {
              parse_mode: 'HTML',
            },
          );
        }
      }

      if (state === ShoppingState.CANCELED || state === ShoppingState.REJECTED) {
        /**
         * Send update stock amount messages
         */
        await shoppingServices.sendUpdateStockAmountMessagesFromShoppingPosts({
          shopping,
        });
      }

      if (state === ShoppingState.DELIVERED) {
        /**
         * Decrement stock amount
         */
        await shoppingServices.decrementStockAmountFromShoppingPosts({
          shopping,
        });
      }

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
