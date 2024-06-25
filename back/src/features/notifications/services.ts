import { NotificationPayload } from '../../types/notifications';
import firebase from 'firebase-admin';
import { userServices } from '../user/services';
import { QueryHandle } from '../../types/general';

import { compact } from '../../utils/general';
import { serviceAccount } from '../../config';
import { Business } from '../../types/business';
import { Shopping } from '../../types/shopping';
import { logger } from '../logger';

export const firebaseInstance = firebase;

const init = () => {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
  });
  console.info('Initialized Firebase SDK');
};

const sendNotificationToUpdate: QueryHandle<{
  payload: NotificationPayload;
}> = async ({ payload }) => {
  const users = await userServices.getAll({
    query: {},
    projection: {
      firebaseToken: 1,
    },
  });

  //TODO no deberias mandar a todos los usuario si no a los que tiene abierta la pagina de ese negocio
  const tokens = compact(users.map((user) => user.firebaseToken));

  await firebase.messaging().sendEachForMulticast({
    data: { payload: JSON.stringify(payload) },
    tokens,
  });
};

const sendTestNativeNotification: QueryHandle<{
  title: string;
  body: string;
}> = async ({ body, title }) => {
  const users = await userServices.getAll({
    query: {
      email: { $in: ['rcupull@gmail.com', 'rcupull+user1@gmail.com'] },
    },
    projection: {
      firebaseToken: 1,
    },
  });

  const tokens = compact(users.map((user) => user.firebaseToken));

  await firebase.messaging().sendEachForMulticast({
    notification: {
      body,
      title,
    },
    tokens,
  });
};

const sendNewOrderPushMessage: QueryHandle<{
  business: Business;
  shopping: Shopping;
}> = async ({ business, shopping }) => {
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

    if (!user) return;

    if (user.firebaseToken) {
      const payload: NotificationPayload = {
        type: 'NEW_ORDER_WAS_CREATED',
        shoopingId: shopping._id.toString(),
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

const sendUpdateStockAmountMessage: QueryHandle<{
  stockAmountAvailable: number;
  postId: string;
}> = async ({ postId, stockAmountAvailable }) => {
  try {
    const users = await userServices.getAll({
      query: {},
      projection: {
        firebaseToken: 1,
      },
    });

    //TODO no deberias mandar a todos los usuario si no a los que tiene abierta la pagina de ese negocio
    const tokens = compact(users.map((user) => user.firebaseToken));

    const payload: NotificationPayload = {
      type: 'POST_AMOUNT_STOCK_CHANGE',
      stockAmountAvailable,
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

const sendOrderInConstructionWasRemoved: QueryHandle<{
  shopping: Shopping;
}> = async ({ shopping }) => {
  try {
    const users = await userServices.getAll({
      query: {
        _id: shopping.purchaserId,
      },
      projection: {
        firebaseToken: 1,
      },
    });

    const tokens = compact(users.map((user) => user.firebaseToken));

    const payload: NotificationPayload = {
      type: 'ORDER_IN_CONSTRUCTION_WAS_REMOVED',
    };

    await firebaseInstance.messaging().sendEachForMulticast({
      data: { payload: JSON.stringify(payload) },
      tokens,
    });
  } catch (e) {
    logger.error(e);
  }
};

export const notificationsServices = {
  sendNotificationToUpdate,
  init,
  sendUpdateStockAmountMessage,
  sendNewOrderPushMessage,
  sendTestNativeNotification,
  sendOrderInConstructionWasRemoved,
};
