import { User } from 'types/auth';
import { PushNotification } from 'types/notifications';

export const getIsUserNotificationsAlreadyRead = (
  notification: PushNotification,
  user: User
): boolean => {
  return !!notification.readBys && !!notification.readBys[user._id];
};

export const getHasSomeUnReadUserNotification = (
  notifications: Array<PushNotification>,
  user: User
): boolean => {
  return notifications.some(
    (notification) => !getIsUserNotificationsAlreadyRead(notification, user)
  );
};
