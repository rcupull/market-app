import { useAuth } from 'features/api-slices/useAuth';
import { useToast } from 'features/toast/useToast';
import { notificationToToastMessage } from 'features/toast/utils';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useRouter } from 'hooks/useRouter';

import { MessagePayload } from 'firebase/messaging';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useCart } from 'pages/@hooks/useCart';
import { PushNotification } from 'types/notifications';

export const useNotificationsUtils = () => {
  const { onCallAfar } = useCallFromAfar();
  const cart = useCart();
  const { onFetch, business } = useBusiness();
  const { isAuthenticated } = useAuth();
  const { isDashboardPage } = useRouter();
  const { showMessage } = useToast();

  const onUpdateNotification = (payload: MessagePayload) => {
    const { data } = payload;
    const notificationPayload =
      data?.payload && (JSON.parse(data.payload) as PushNotification | undefined);

    if (notificationPayload) {
      if (DEVELOPMENT) {
        console.log('notificationPayload', notificationPayload);
      }

      //////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////
      /**
       * show notification message if has some content
       */
      const toastMessgae = notificationToToastMessage(notificationPayload);
      toastMessgae && showMessage(toastMessgae);

      //////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////
      /**
       * handle notification if it is neccessary
       */
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
    onUpdateNotification
  };
};
