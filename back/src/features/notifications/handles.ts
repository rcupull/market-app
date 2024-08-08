import { RequestHandler } from '../../types/general';
import { withTryCatch } from '../../utils/error';

import { notificationsServicesGetOne } from './services';
import { get404Response, getUserNotFoundResponse } from '../../utils/server-response';

const puts_notifications_notificationId_read: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params, user } = req;
      const { notificationId } = params;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const notification = await notificationsServicesGetOne({
        query: {
          _id: notificationId
        }
      });

      if (!notification) {
        return get404Response({ res });
      }

      if (!notification.readBys) {
        notification.readBys = {};
      }

      notification.readBys[user._id.toString()] = new Date();

      await notification.save();

      res.send({});
    });
  };
};

export const notificationsHandles = {
  puts_notifications_notificationId_read
};
