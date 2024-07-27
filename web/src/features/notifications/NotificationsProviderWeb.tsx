import { useEffect } from 'react';

import { useAuthUpdateFirebaseToken } from 'features/api/auth/useAuthUpdateFirebaseToken';
import { useAuth } from 'features/api-slices/useAuth';

import { useNotificationsUtils } from './useNotificationsUtils';
import { firebaseVapidKey, getFirebaseMessaging } from './utils';

import { getToken, isSupported, Messaging, onMessage } from 'firebase/messaging';

const NotificationsProviderWeb = () => {
  const { isAuthenticated } = useAuth();
  const { authUpdateFirebaseToken } = useAuthUpdateFirebaseToken();

  const { onUpdateNotification } = useNotificationsUtils();

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
            console.log('firebase payload:', payload);

            onUpdateNotification(payload);
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

  return null;
};

export default NotificationsProviderWeb;
