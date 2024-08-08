import { useUpdateNotificationRead } from 'features/api/notifications/useUpdateNotificationRead';
import { useAuth } from 'features/api-slices/useAuth';
import { useUserNotifications } from 'features/api-slices/useUserNotifications';

import { ToastMessage } from 'types/toast';
import { cn } from 'utils/general';
import { getIsUserNotificationsAlreadyRead } from 'utils/notifications';

interface RenderToastMessageProps {
  toastMessage: ToastMessage;
}
export const RenderToastMessage = ({ toastMessage }: RenderToastMessageProps) => {
  const { body, title, meta } = toastMessage;
  const { updateNotificationRead } = useUpdateNotificationRead();
  const { onRefresh } = useUserNotifications();
  const { user } = useAuth();

  const readAlready = meta && user && getIsUserNotificationsAlreadyRead(meta, user);

  return (
    <div
      className={cn('flex cursor-pointer', {
        'opacity-50': readAlready
      })}
      onClick={() => {
        meta &&
          updateNotificationRead.fetch(
            { notificationId: meta._id },
            { onAfterSuccess: () => onRefresh() }
          );
      }}
    >
      <div className="ms-3">
        <h3 className="text-gray-800 font-semibold text-lg">{title}</h3>
        <div className="text-sm text-gray-700 mt-1">{body}</div>
      </div>
    </div>
  );
};
