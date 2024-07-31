import { NotificationPayload } from '../../types/notifications';
import firebase from 'firebase-admin';
import { QueryHandle } from '../../types/general';

import { compact, excludeRepetedValues } from '../../utils/general';
import { serviceAccount } from '../../config';
import { Business } from '../../types/business';
import { Shopping } from '../../types/shopping';
import { logger } from '../logger';
import { userServicesGetAll, userServicesGetOne } from '../user/services';

const firebaseInstance = firebase;

export const notificationsServicesInit = () => {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
  });
  console.info('Initialized Firebase SDK');
};

export const notificationsServicesSendNotificationToUpdate: QueryHandle<{
  payload: NotificationPayload;
}> = async ({ payload }) => {
  const users = await userServicesGetAll({
    query: {},
    projection: {
      firebaseToken: 1,
    },
  });

  //TODO no deberias mandar a todos los usuario si no a los que tiene abierta la pagina de ese negocio
  let tokens = compact(users.map((user) => user.firebaseToken)); //
  tokens = excludeRepetedValues(tokens);

  await firebase.messaging().sendEachForMulticast({
    data: { payload: JSON.stringify(payload) },
    tokens,
  });
};

export const notificationsServicesSendTestNativeNotification: QueryHandle<{
  title: string;
  body: string;
}> = async ({ body, title }) => {
  const users = await userServicesGetAll({
    query: {
      email: { $in: ['rcupull@gmail.com', 'rcupull+user1@gmail.com'] },
    },
    projection: {
      firebaseToken: 1,
    },
  });

  let tokens = compact(users.map((user) => user.firebaseToken));
  tokens = excludeRepetedValues(tokens);

  await firebase.messaging().sendEachForMulticast({
    notification: {
      body,
      title,
    },
    tokens,
  });
};

export const notificationsServicesSendNewOrderPushMessage: QueryHandle<{
  business: Business;
  shopping: Shopping;
}> = async ({ business, shopping }) => {
  try {
    const { createdBy, routeName, name } = business;
    const user = await userServicesGetOne({
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
        businessName: name,
      };

      await firebaseInstance.messaging().sendEachForMulticast({
        data: { payload: JSON.stringify(payload) },
        tokens: [user.firebaseToken],
        notification: {
          title: 'Nueva orden de compra',
          body: 'Excelente trabajo!!',
        },
      });
    }
  } catch (e) {
    logger.error(e);
  }
};

export const notificationsServicesSendUpdateStockAmountMessage: QueryHandle<{
  stockAmountAvailable: number;
  postId: string;
}> = async ({ postId, stockAmountAvailable }) => {
  try {
    const users = await userServicesGetAll({
      query: {},
      projection: {
        firebaseToken: 1,
      },
    });

    //TODO no deberias mandar a todos los usuario si no a los que tiene abierta la pagina de ese negocio
    let tokens = compact(users.map((user) => user.firebaseToken));
    tokens = excludeRepetedValues(tokens);

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

export const notificationsServicesSendOrderInConstructionWasRemoved: QueryHandle<{
  shopping: Shopping;
}> = async ({ shopping }) => {
  try {
    const users = await userServicesGetAll({
      query: {
        _id: shopping.purchaserId,
      },
      projection: {
        firebaseToken: 1,
      },
    });

    let tokens = compact(users.map((user) => user.firebaseToken));
    tokens = excludeRepetedValues(tokens);

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
