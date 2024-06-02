import { join } from 'path';
import { NotificationToUpdatePayload } from '../../types/notifications';
import firebase from 'firebase-admin';
import { userServices } from '../user/services';
import { QueryHandle } from '../../types/general';
import { ServerResponse } from 'http';
import { compact } from '../../utils/general';
import { serviceAccount } from '../../config';

const init = () => {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
  });
  console.info('Initialized Firebase SDK');
};

const sendNotification = async (args: { title: string; message: string }) => {};

const sendNotificationToUpdate: QueryHandle<{
  payload: NotificationToUpdatePayload;
}> = async ({ payload, res, req }) => {
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

  await firebase.messaging().sendEachForMulticast({
    data: { payload: JSON.stringify(payload) },
    tokens,
  });
};

export const notificationsServices = {
  sendNotification,
  sendNotificationToUpdate,
  init,
};
