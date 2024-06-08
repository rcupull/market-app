import { ServerResponse } from 'http';
import { Business } from '../../types/business';
import { QueryHandle } from '../../types/general';
import { userServices } from '../user/services';
import { Shopping } from '../../types/shopping';
import { firebaseInstance } from './services';
import { NotificationPayload } from '../../types/notifications';
import { compact } from '../../utils/general';
import { logger } from '../logger';

export const sendNewOrderPushMessage: QueryHandle<{
  business: Business;
  order: Shopping;
}> = async ({ business, order }) => {
  try {
    const { createdBy, routeName } = business;
    const user = await userServices.getOne({
      query: {
        _id: createdBy,
      },
      projection: {
        firebaseToken: 1,
      },
    });

    if (user instanceof ServerResponse) return user;

    if (!user) return;

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
  } catch (e) {
    logger.error(e);
  }
};

export const sendUpdateStockAmountMessage: QueryHandle<{
  currentStockAmount: number;
  postId: string;
}> = async ({ postId, currentStockAmount }) => {
  try {
    const users = await userServices.find({
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
  } catch (e) {
    logger.error(e);
  }
};
