import { PushNotificationType } from '../../types/notifications';
import firebase from 'firebase-admin';
import { QueryHandle } from '../../types/general';

import { compact, excludeRepetedValues } from '../../utils/general';
import { serviceAccount } from '../../config';
import { Shopping } from '../../types/shopping';
import { logger } from '../logger';
import { userServicesGetAll } from '../user/services';
import {
  PushNotificationBusinessData,
  PushNotificationModel,
  PushNotificationUserData
} from '../../schemas/notifications';

const firebaseInstance = firebase;

export const notificationsServicesInit = () => {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
  });
  console.info('Initialized Firebase SDK');
};

export const notificationsServicesSendNewOrderApprovedMessage: QueryHandle<{
  shoppingId: string;
  businessData: PushNotificationBusinessData;
  userData: PushNotificationUserData;
}> = async ({ shoppingId, businessData, userData }) => {
  /**
   * este mensaje es enviado para el cliente cuando se apruebe una nueva orden
   */

  const { businessName, routeName } = businessData;

  const notification = new PushNotificationModel({
    type: PushNotificationType.ORDER_WAS_APPROVED,
    userIds: [userData.userId],
    shoppingId,
    routeName,
    businessName
  });

  await notification.save();

  await firebaseInstance.messaging().send({
    data: { payload: JSON.stringify(notification) },
    token: userData.firebaseToken,
    notification: {
      title: 'Orden de compra aceptada',
      body: 'Ya casi tienes tu producto'
    }
  });
};

export const notificationsServicesSendNewOrderPushMessage: QueryHandle<{
  userData: PushNotificationUserData;
  businessData: PushNotificationBusinessData;
  shopping: Shopping;
}> = async ({ businessData, shopping, userData }) => {
  try {
    const { routeName, businessName } = businessData;

    const notification = new PushNotificationModel({
      type: PushNotificationType.NEW_ORDER_WAS_CREATED,
      shoppingId: shopping._id.toString(),
      routeName,
      businessName,
      userIds: [userData.userId]
    });

    await notification.save();

    await firebaseInstance.messaging().send({
      data: { payload: JSON.stringify(notification) },
      token: userData.firebaseToken,
      notification: {
        title: 'Nueva orden de compra',
        body: 'Excelente trabajo!!'
      }
    });
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
        firebaseToken: 1
      }
    });

    //TODO no deberias mandar a todos los usuario si no a los que tiene abierta la pagina de ese negocio
    let tokens = compact(users.map((user) => user.firebaseToken));
    tokens = excludeRepetedValues(tokens);

    const notification = new PushNotificationModel({
      type: PushNotificationType.POST_AMOUNT_STOCK_CHANGE,
      stockAmountAvailable,
      postId
    });

    await firebaseInstance.messaging().sendEachForMulticast({
      data: { payload: JSON.stringify(notification) },
      tokens
    });
  } catch (e) {
    logger.error(e);
  }
};

export const notificationsServicesSendOrderInConstructionWasRemoved: QueryHandle<{
  userData: PushNotificationUserData;
}> = async ({ userData }) => {
  const { firebaseToken } = userData;
  try {
    const notification = new PushNotificationModel({
      type: PushNotificationType.ORDER_IN_CONSTRUCTION_WAS_REMOVED
    });

    await firebaseInstance.messaging().send({
      data: { payload: JSON.stringify(notification) },
      token: firebaseToken
    });
  } catch (e) {
    logger.error(e);
  }
};
