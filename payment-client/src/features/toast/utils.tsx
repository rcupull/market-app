import { Divider } from 'components/divider';

import { AuthContainer } from 'pages/@common/auth-container';
import { PushNotification } from 'types/notifications';
import { ToastMessage } from 'types/toast';
import { getDateString } from 'utils/date';
import { cn } from 'utils/general';
import { getIsUserNotificationsAlreadyRead } from 'utils/notifications';

export const notificationToToastMessage = (
  notification: PushNotification,
  options?: { unreadMark?: boolean }
): ToastMessage | null => {
  const { type, businessName, createdAt } = notification;
  const { unreadMark } = options || {};

  //eslint-disable-next-line
  const renderTitle = (title: string) => {
    return (
      <AuthContainer>
        {({ user }) => {
          const alreadyRead = user && getIsUserNotificationsAlreadyRead(notification, user);

          return (
            <div className={cn('flex flex-col mb-3')}>
              <Divider narrow />

              <div className="flex items-center gap-2">
                {title}
                {unreadMark && !alreadyRead && (
                  <span className="text-sm font-bold text-indigo-500">(no leída)</span>
                )}
              </div>

              <span className="text-md font-bold text-gray-500">{businessName}</span>

              <span className="text-xs font-bold text-gray-500">
                {getDateString({ date: createdAt, showTime: true })}
              </span>
            </div>
          );
        }}
      </AuthContainer>
    );
  };

  switch (type) {
    default: {
      return null;
    }
  }
};
