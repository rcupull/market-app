import 'react-toastify/dist/ReactToastify.css';
import { createContext, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { useAuthUpdateFirebaseToken } from 'features/api/auth/useAuthUpdateFirebaseToken';
import { useAuth } from 'features/api-slices/useAuth';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useRouter } from 'hooks/useRouter';

import { NotificationPayload } from '../../types/notifications';
import { firebaseVapidKey, getFirebaseMessaging, renderNotificationsContent } from './utils';

//eslint-disable-next-line
import { getToken, isSupported, MessagePayload, Messaging, onMessage } from 'firebase/messaging';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { ChildrenProp } from 'types/general';

interface State {
  init: () => Promise<void>;
  showMessage: (n: Notification) => void;
}

export const NotificationsContext = createContext<State>({
  init: () => new Promise((resolve) => resolve()),
  showMessage: () => {},
});

export const NotificationsProvider = ({ children }: ChildrenProp) => {
  const { isAuthenticated } = useAuth();
  const { isDashboardPage } = useRouter();
  const { onFetch, business } = useBusiness();
  const { authUpdateFirebaseToken } = useAuthUpdateFirebaseToken();

  const { onCallAfar } = useCallFromAfar();
  const showMessage: State['showMessage'] = (n) => {
    toast(renderNotificationsContent(n));
  };

  const handleUpdateNotification = (payload: MessagePayload) => {
    const { data } = payload;
    const notificationPayload =
      data?.payload && (JSON.parse(data.payload) as NotificationPayload | undefined);

    if (notificationPayload) {
      const { type } = notificationPayload;

      switch (type) {
        case 'POST_AMOUNT_STOCK_CHANGE': {
          const { postId, stockAmount } = notificationPayload;

          onCallAfar('updatePostAmount', { postId, stockAmount });
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

  const handleGetToken = async (messaging: Messaging): Promise<string | undefined> => {
    try {
      const newToken = await getToken(messaging, {
        vapidKey: firebaseVapidKey,
      });

      if (DEVELOPMENT) {
        console.log('Firebase token from getToken: ', `${newToken}`);
      }

      if (newToken) {
        return newToken;
      } else {
        console.log('No registration token available. Request permission to generate one.');
        return;
      }
    } catch (err) {
      console.log('An error occurred while retrieving token. ', err);
      return;
    }
  };

  const init = async () => {
    const suported = await isSupported();

    if (suported) {
      const newMessaging = getFirebaseMessaging();

      const newToken = await handleGetToken(newMessaging);

      if (newToken) {
        authUpdateFirebaseToken.fetch({ firebaseToken: newToken });
        onMessage(newMessaging, (payload) => {
          if (payload) {
            if (DEVELOPMENT) {
              console.log('firebase payload:', payload);
            }

            handleUpdateNotification(payload);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      init();
    }
  }, [isAuthenticated]);

  return (
    <NotificationsContext.Provider
      value={{
        init,
        showMessage,
      }}
    >
      <ToastContainer />
      {children}
    </NotificationsContext.Provider>
  );
};
