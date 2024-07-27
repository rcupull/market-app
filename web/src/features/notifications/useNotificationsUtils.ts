import { useAuth } from 'features/api-slices/useAuth';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useRouter } from 'hooks/useRouter';

import { MessagePayload } from 'firebase/messaging';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useCart } from 'pages/@hooks/useCart';
import { NotificationPayload } from 'types/notifications';

export const useNotificationsUtils = () => {
  const { onCallAfar } = useCallFromAfar();
  const cart = useCart();
  const { onFetch, business } = useBusiness();
  const { isAuthenticated } = useAuth();
  const { isDashboardPage } = useRouter();

  const onUpdateNotification = (payload: MessagePayload) => {
    const { data } = payload;
    const notificationPayload =
      data?.payload && (JSON.parse(data.payload) as NotificationPayload | undefined);

    if (notificationPayload) {
      const { type } = notificationPayload;

      switch (type) {
        case 'POST_AMOUNT_STOCK_CHANGE': {
          const { postId, stockAmountAvailable } = notificationPayload;

          onCallAfar('updatePostAmount', { postId, stockAmountAvailable });
          return;
        }
        case 'ORDER_IN_CONSTRUCTION_WAS_REMOVED': {
          cart.onFetch();
          return;
        }
        case 'NEW_ORDER_WAS_CREATED': {
          const { routeName } = notificationPayload;

          if (isAuthenticated && isDashboardPage && business && business.routeName === routeName) {
            onFetch({ routeName });
          }
          return;
        }
        default: {
          return;
        }
      }
    }
  };

  return {
    onUpdateNotification,
  };
};
