import { useEffect } from 'react';

import { Button } from 'components/button';
import { IconButton } from 'components/icon-button';
import { IconButtonRefresh } from 'components/icon-button-refresh';
import { Menu } from 'components/menu';
import { SpinnerBox } from 'components/spinner-box';

import { useGetUserNotifications } from 'features/api/user/useGetUserNotifications';
import { useAuth } from 'features/api-slices/useAuth';
import { notificationToToastMessage, renderToastMessage } from 'features/toast/utils';

import SvgBell from 'icons/Bell';

export const NotificationsMenu = () => {
  const { isAuthenticated, user } = useAuth();

  const { getUserNotifications } = useGetUserNotifications();

  const onRefresh = () => {
    user && getUserNotifications.fetch({ userId: user._id });
  };

  useEffect(() => {
    onRefresh();
  }, [user]);

  const getContent = () => {
    if (!isAuthenticated || !getUserNotifications.data?.length) return null;

    return (
      <div className="flex flex-col">
        <div className="flex m-1 justify-end gap-2">
          <Button label="Todas" preventDefault variant="transparent" className="rounded-3xl" />
          <Button label="No leídas" preventDefault variant="transparent" className="rounded-3xl" />
          <IconButtonRefresh
            onClick={() => onRefresh()}
            preventDefault
            isBusy={getUserNotifications.status.isBusy}
          />
        </div>
        <div className="overflow-y-auto max-h-[75vh]">
          {getUserNotifications.data?.map((notification, index) => {
            const toastMessage = notificationToToastMessage(notification);

            if (!toastMessage) {
              return null;
            }

            return (
              <div key={index} className="w-80 mt-3">
                {renderToastMessage(toastMessage)}
              </div>
            );
          })}
        </div>
        {getUserNotifications.status.isBusy && <SpinnerBox />}
      </div>
    );
  };

  const renderButtonElement = () => {
    return <IconButton svg={<SvgBell className="!size-7" />} />;
  };

  return (
    <Menu
      topElement={getContent()}
      buttonElement={renderButtonElement()}
      className="flex-shrink-0"
    />
  );
};
