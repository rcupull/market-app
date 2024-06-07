import { ServerResponse } from 'http';
import { Business } from '../../types/business';
import { QueryHandle } from '../../types/general';
import { userServices } from '../user/services';
import { Shopping } from '../../types/shopping';
import { withTryCatch } from '../../utils/error';
import { firebaseInstance } from './services';
import { NotificationPayload } from '../../types/notifications';
import { compact } from '../../utils/general';

export const sendNewOrderPushMessage: QueryHandle<{
  business: Business;
  order: Shopping;
}> = async ({ business, res, req, order }) => {
  withTryCatch(req, res, async () => {
    const { createdBy, routeName } = business;
    const user = await userServices.getOne({
      res,
      req,
      query: {
        _id: createdBy,
      },
      projection: {
        firebaseToken: 1,
      },
    });

    if (user instanceof ServerResponse) return user;

    if (user.firebaseToken) {
      const payload: NotificationPayload = {
        type: 'NEW_ORDER_WAS_CREATED',
        shoopingId: order._id.toString(),
        routeName,
      };

      await firebaseInstance.messaging().sendEachForMulticast({
        data: { payload: JSON.stringify(payload) },
        tokens: [user.firebaseToken],
      });
    }
  });
};

export const sendUpdateStockAmountMessage: QueryHandle<{
  currentStockAmount: number;
  postId: string;
}> = async ({ postId, res, req, currentStockAmount }) => {
  withTryCatch(req, res, async () => {
    const users = await userServices.find({
      res,
      req,
      query: {},
      projection: {
        firebaseToken: 1,
      },
    });

    if (users instanceof ServerResponse) return users;

    //TODO no deberias mandar a todos los usuario si no a los que tiene abierta la pagina de ese negocio
    const tokens = compact(users.map((user) => user.firebaseToken));

    const payload: NotificationPayload = {
      type: 'POST_AMOUNT_STOCK_CHANGE',
      stockAmount: currentStockAmount,
      postId,
    };

    await firebaseInstance.messaging().sendEachForMulticast({
      data: { payload: JSON.stringify(payload) },
      tokens,
    });
  });
};
