import { ServerResponse } from 'http';
import { Business } from '../../types/business';
import { QueryHandle } from '../../types/general';
import { userServices } from '../user/services';
import { Shopping } from '../../types/shopping';
import { withTryCatch } from '../../utils/error';
import { firebaseInstance } from './services';
import { NotificationPayload } from '../../types/notifications';

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
