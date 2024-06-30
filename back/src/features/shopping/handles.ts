import { AnyRecord, RequestHandler } from '../../types/general';
import { withTryCatch } from '../../utils/error';

import {
  get400Response,
  getBusinessNotFoundResponse,
  getPostNotFoundResponse,
  getShoppingNotFoundResponse,
  getUserNotFoundResponse,
} from '../../utils/server-response';
import {
  shoppingServicesDecrementStockAmountFromShoppingPosts,
  shoppingServicesFindAndUpdateOne,
  shoppingServicesGetAllWithPagination,
  shoppingServicesGetOne,
  shoppingServicesGetStockAmountAvailableFromPosts,
  shoppingServicesSendUpdateStockAmountMessagesFromShoppingPosts,
  shoppingServicesUpdateOrAddOne,
} from './services';
import { deepJsonCopy, isNumber } from '../../utils/general';
import { businessServicesFindOne } from '../business/services';
import { deleteOnePostFromShoppingInContruction, deleteShoppingInConstruction } from './utils';
import { logger } from '../logger';
import { PostPurshaseNotes } from '../../types/post';
import { ShoppingModel } from '../../schemas/shopping';
import { sendNewOrderTelegramMessage } from '../telegram/handles';
import { Shopping, ShoppingDto, ShoppingState } from '../../types/shopping';
import { telegramServices } from '../telegram/services';
import { userServices } from '../user/services';
import { User } from '../../types/user';
import { getShoppingUrl } from '../../utils/web';
import { Business } from '../../types/business';
import { defaultQuerySort } from '../../utils/api';
import {
  notificationsServicesSendNewOrderPushMessage,
  notificationsServicesSendUpdateStockAmountMessage,
} from '../notifications/services';
import { billingServices } from '../billing/services';

const get_shopping: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { query, user, paginateOptions } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { routeName, sort = defaultQuerySort } = query;

      const shoppings = await shoppingServicesGetAllWithPagination({
        paginateOptions,
        sort,
        query: {
          routeName,
          purchaserId: user._id,
        },
      });

      const out = deepJsonCopy(shoppings);

      const { getOneShoppingBillData } = await billingServices.getBillDataFromShopping({
        query: { shoppingIds: { $in: out.data.map(({ _id }) => _id) } },
      });

      const getShoppingDto = async (shopping: Shopping): Promise<ShoppingDto> => {
        const billData = getOneShoppingBillData(shopping);

        if (!billData) {
          return shopping;
        }

        const { billId, billState } = billData;

        return {
          ...shopping,
          billId,
          billState,
        };
      };

      const promises = out.data.map(getShoppingDto);
      out.data = await Promise.all(promises);

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

      const out = await shoppingServicesGetAllWithPagination({
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

      const out = await shoppingServicesGetOne({
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

      const [stockAmountAvailable] = await shoppingServicesGetStockAmountAvailableFromPosts({
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
          await shoppingServicesUpdateOrAddOne({
            amountToAdd: stockAmountAvailable,
            post,
            user,
          });

          /**
           * send notification to update the post. TODO maybe we need some conditions
           */
          notificationsServicesSendUpdateStockAmountMessage({
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
        await shoppingServicesUpdateOrAddOne({
          amountToAdd: amountToAdd,
          post,
          user,
        });

        /**
         * send notification to update the post. TODO maybe we need some conditions
         */
        notificationsServicesSendUpdateStockAmountMessage({
          postId: post._id.toString(),
          stockAmountAvailable: stockAmountAvailable - amountToAdd,
        });

        return res.send({});
      }

      /**
       * The purshaseNotes is added only when the purshase is created
       */
      await shoppingServicesUpdateOrAddOne({
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

      const shopping = await shoppingServicesFindAndUpdateOne({
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

      const business = await businessServicesFindOne({
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
      notificationsServicesSendNewOrderPushMessage({ business, shopping });

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

        const businessData: Pick<Business, 'name'> | null = await businessServicesFindOne({
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
        await shoppingServicesSendUpdateStockAmountMessagesFromShoppingPosts({
          shopping,
        });
      }

      if (state === ShoppingState.DELIVERED) {
        /**
         * Decrement stock amount
         */
        await shoppingServicesDecrementStockAmountFromShoppingPosts({
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
