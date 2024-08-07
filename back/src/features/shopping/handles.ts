import { AnyRecord, RequestHandler } from '../../types/general';
import { withTryCatch } from '../../utils/error';

import {
  get400Response,
  getBusinessNotFoundResponse,
  getPostNotFoundResponse,
  getShoppingNotFoundResponse,
  getUserNotFoundResponse
} from '../../utils/server-response';
import {
  shoppingServicesDecrementStockAmountFromShoppingPosts,
  shoppingServicesFindAndUpdateOne,
  shoppingServicesGetAllWithPagination,
  shoppingServicesGetDataFromPosts,
  shoppingServicesGetOne,
  shoppingServicesSendUpdateStockAmountMessagesFromShoppingPosts,
  shoppingServicesUpdateOrAddOne
} from './services';
import { deepJsonCopy, isNumber } from '../../utils/general';
import { businessServicesGetBusinessDataForPushNotifications } from '../business/services';
import {
  deleteOnePostFromShoppingInContruction,
  deleteShoppingInConstruction,
  wasApprovedShopping
} from './utils';
import { logger } from '../logger';
import { PostPurshaseNotes } from '../../types/post';
import { ShoppingModel } from '../../schemas/shopping';
import { Shopping, ShoppingDto, ShoppingState } from '../../types/shopping';
import {
  userServicesGetUsersDataForPushNotifications,
  userServicesGetUserDataFromShopping
} from '../user/services';
import { defaultQuerySort } from '../../utils/api';
import {
  notificationsServicesSendNewOrderApprovedMessage,
  notificationsServicesSendNewOrderPushMessage,
  notificationsServicesSendUpdateStockAmountMessage
} from '../notifications/services';
import { billingServicesGetBillDataFromShopping } from '../billing/services';

const get_shopping: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { query, user, paginateOptions } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { routeName, sort = defaultQuerySort, states } = query;

      const shoppings = await shoppingServicesGetAllWithPagination({
        paginateOptions,
        sort,
        query: {
          routeName,
          states,
          purchaserId: user._id
        }
      });

      const out = deepJsonCopy(shoppings);

      const { getOneShoppingBillData } = await billingServicesGetBillDataFromShopping({
        query: { shoppingIds: { $in: out.data.map(({ _id }) => _id) } }
      });

      const { getOneShoppingUserData } = await userServicesGetUserDataFromShopping({
        query: { _id: { $in: out.data.map(({ purchaserId }) => purchaserId) } }
      });

      const getShoppingDto = async (shopping: Shopping): Promise<ShoppingDto> => {
        const billData = getOneShoppingBillData(shopping);

        const out: ShoppingDto = {
          ...shopping,
          billId: billData?.billId,
          billState: billData?.billState,
          purchaserName: undefined,
          purchaserAddress: undefined,
          purchaserPhone: undefined
        };

        /**
         * Not return the user data if the shoping was not approved
         */
        if (!wasApprovedShopping(shopping)) return out;

        const purchaserData = getOneShoppingUserData(shopping);

        return {
          ...out,
          purchaserName: purchaserData?.purchaserName,
          purchaserAddress: purchaserData?.purchaserAddress,
          purchaserPhone: purchaserData?.purchaserPhone
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
      const { states, sort = defaultQuerySort } = query;

      const shoppings = await shoppingServicesGetAllWithPagination({
        paginateOptions,
        sort,
        query: {
          routeName,
          states
        }
      });

      const { getOneShoppingUserData } = await userServicesGetUserDataFromShopping({
        query: { _id: { $in: shoppings.data.map(({ purchaserId }) => purchaserId) } }
      });

      const { getOneShoppingBillData } = await billingServicesGetBillDataFromShopping({
        query: { _id: { $in: shoppings.data.map((s) => s.purchaserId) } }
      });

      const getShoppingDto = async (shopping: Shopping): Promise<ShoppingDto> => {
        const billData = getOneShoppingBillData(shopping);

        const out: ShoppingDto = {
          ...shopping,
          billId: billData?.billId,
          billState: billData?.billState,
          purchaserName: undefined,
          purchaserAddress: undefined,
          purchaserPhone: undefined
        };

        /**
         * Not return the user data if the shoping was not approved
         */
        if (!wasApprovedShopping(shopping)) return out;

        const purchaserData = getOneShoppingUserData(shopping);

        return {
          ...out,
          purchaserName: purchaserData?.purchaserName,
          purchaserAddress: purchaserData?.purchaserAddress,
          purchaserPhone: purchaserData?.purchaserPhone
        };
      };

      const out = deepJsonCopy(shoppings);
      const promises = out.data.map(getShoppingDto);
      out.data = await Promise.all(promises);

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
          purchaserId: user._id
        }
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

      const { getPostData } = await shoppingServicesGetDataFromPosts({
        posts: [post]
      });

      const { stockAmountAvailable } = getPostData(post);

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
            purshaseNotes
          });

          /**
           * send notification to update the post. TODO maybe we need some conditions
           */
          notificationsServicesSendUpdateStockAmountMessage({
            postId: post._id.toString(),
            stockAmountAvailable: 0
          });

          return res.send({
            message:
              'Por falta de disponibilidad en el stock no se han podido agregar la cantidad solicitada. Se han agregado solamente las cantidades disponibles.'
          });
        }

        /**
         * add the amount to add
         */
        await shoppingServicesUpdateOrAddOne({
          amountToAdd: amountToAdd,
          post,
          user,
          purshaseNotes
        });

        /**
         * send notification to update the post. TODO maybe we need some conditions
         */
        notificationsServicesSendUpdateStockAmountMessage({
          postId: post._id.toString(),
          stockAmountAvailable: stockAmountAvailable - amountToAdd
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
        user
      });

      res.send({});
    });
  };
};

const post_shopping_shoppingId_make_order: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params, body, user } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { shoppingId } = params;
      const { delivery } = body;

      const shopping = await shoppingServicesFindAndUpdateOne({
        query: {
          _id: shoppingId,
          purchaserId: user._id
        },
        update: {
          state: ShoppingState.REQUESTED,
          delivery
        }
      });

      if (!shopping) {
        logger.error('It is weird, maybe there is a bug');
        return res.send({});
      }

      const businessData = await businessServicesGetBusinessDataForPushNotifications({
        routeName: shopping.routeName
      });

      /**
       * send push message
       */

      if (businessData) {
        const [userData] = await userServicesGetUsersDataForPushNotifications({
          query: {
            _id: businessData.createdBy
          }
        });

        if (userData) {
          notificationsServicesSendNewOrderPushMessage({
            shopping,
            businessData,
            userData
          });
        }
      }

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

      if (state === ShoppingState.CONSTRUCTION) {
        return get400Response({
          res,
          json: { message: 'Can not change the state to CONSTRUCTION' }
        });
      }

      const shopping = await ShoppingModel.findOne({
        _id: shoppingId
      });

      if (!shopping) {
        return getShoppingNotFoundResponse({ res });
      }

      if (shopping.state === ShoppingState.CONSTRUCTION) {
        return get400Response({
          res,
          json: { message: 'Can not change the state from CONSTRUCTION' }
        });
      }

      if (shopping?.history) {
        shopping.history.push({
          state: shopping.state,
          lastUpdatedDate: new Date()
        });
      } else {
        shopping.history = [
          {
            state: shopping.state,
            lastUpdatedDate: new Date()
          }
        ];
      }

      shopping.state = state;

      await shopping.save();

      if (state === ShoppingState.APPROVED) {
        /**
         * send push notificaion when the shopping to be aproved
         */

        const [userData] = await userServicesGetUsersDataForPushNotifications({
          query: {
            _id: shopping.purchaserId
          }
        });

        const businessData = await businessServicesGetBusinessDataForPushNotifications({
          routeName: shopping.routeName
        });

        if (userData && businessData) {
          notificationsServicesSendNewOrderApprovedMessage({
            shoppingId: shopping._id.toString(),
            businessData,
            userData
          });
        }
      }

      if (state === ShoppingState.CANCELED || state === ShoppingState.REJECTED) {
        /**
         * Send update stock amount messages
         */
        await shoppingServicesSendUpdateStockAmountMessagesFromShoppingPosts({
          shopping
        });
      }

      if (state === ShoppingState.DELIVERED) {
        /**
         * Decrement stock amount
         */
        await shoppingServicesDecrementStockAmountFromShoppingPosts({
          shopping
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

      const { routeName, postId, purshaseNotes } = body;

      if (postId && !purshaseNotes) {
        return get400Response({ res, json: { message: 'The purshaseNotes are required' } });
      }

      postId
        ? await deleteOnePostFromShoppingInContruction({ routeName, user, postId, purshaseNotes })
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
  get_shopping_owner
};
