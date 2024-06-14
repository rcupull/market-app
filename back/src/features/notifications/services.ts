import { NotificationPayload } from '../../types/notifications';
import firebase from 'firebase-admin';
import { userServices } from '../user/services';
import { QueryHandle } from '../../types/general';

import { compact } from '../../utils/general';
import { serviceAccount } from '../../config';

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
  const users = await userServices.find({
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

export const notificationsServices = {
  sendNotificationToUpdate,
  init,
};
