import { useEffect } from 'react';

import { Button } from 'components/button';
import { IconButton } from 'components/icon-button';
import { IconButtonRefresh } from 'components/icon-button-refresh';
import { Menu } from 'components/menu';
import { SpinnerBox } from 'components/spinner-box';

import { useAuth } from 'features/api-slices/useAuth';
import { useUserNotifications } from 'features/api-slices/useUserNotifications';
import { RenderToastMessage } from 'features/toast/RenderToastMessage';
import { notificationToToastMessage } from 'features/toast/utils';

import SvgBell from 'icons/Bell';
import { getHasSomeUnReadUserNotification } from 'utils/notifications';

export const NotificationsMenu = () => {
  const { isAuthenticated, user } = useAuth();

  const userNotifications = useUserNotifications();

  useEffect(() => {
    userNotifications.onRefresh();
  }, []);

  const getContent = () => {
    if (!isAuthenticated || !userNotifications.data?.length) return null;

    return (
      <div className="flex flex-col">
        <div className="flex m-1 mt-3 justify-end gap-2">
          <Button
            label="Todas"
            preventDefault
            variant={!userNotifications.onlyUnread ? 'outlined' : 'transparent'}
            className="!rounded-3xl !py-0"
            onClick={() => userNotifications.onRefresh({ onlyUnread: false })}
          />
          <Button
            label="No leídas"
            preventDefault
            variant={userNotifications.onlyUnread ? 'outlined' : 'transparent'}
            onClick={() => userNotifications.onRefresh({ onlyUnread: true })}
            className="!rounded-3xl !py-0"
          />
          <IconButtonRefresh
            onClick={() => userNotifications.onRefresh()}
            preventDefault
            isBusy={userNotifications.status.isBusy}
            className="!py-0"
          />
        </div>
        <div className="overflow-y-auto max-h-[75vh]">
          {userNotifications.data.map((notification, index) => {
            const toastMessage = notificationToToastMessage(notification, { unreadMark: true });

            if (!toastMessage) {
              return null;
            }

            return (
              <div key={index} className="w-80 mt-3">
                <RenderToastMessage toastMessage={toastMessage} />
              </div>
            );
          })}
        </div>
        {userNotifications.status.isBusy && <SpinnerBox />}
      </div>
    );
  };

  const getHasUnreadNotifications = () => {
    return user && getHasSomeUnReadUserNotification(userNotifications.data, user);
  };

  const renderButtonElement = () => {
    return (
      <div className="relative">
        <IconButton svg={<SvgBell className="!size-7" />} />
        {getHasUnreadNotifications() && (
          <div className="size-2 bg-red-600 absolute top-2 right-2 rounded-full" />
        )}
      </div>
    );
  };

  return (
    <Menu
      topElement={getContent()}
      buttonElement={renderButtonElement()}
      className="flex-shrink-0"
    />
  );
};
