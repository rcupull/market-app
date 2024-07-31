import { useEffect } from 'react';

import { useAuthUpdateFirebaseToken } from 'features/api/auth/useAuthUpdateFirebaseToken';
import { useAuth } from 'features/api-slices/useAuth';

import { useNotificationsUtils } from './useNotificationsUtils';

import { PushNotifications } from '@capacitor/push-notifications';

const NotificationsProviderNative = () => {
  const { isAuthenticated } = useAuth();
  const { authUpdateFirebaseToken } = useAuthUpdateFirebaseToken();

  const { onUpdateNotification } = useNotificationsUtils();

  const init = async () => {
    await addListeners();
    await registerNotifications();
  };

  const addListeners = async () => {
    await PushNotifications.addListener('registration', (token) => {
      if(DEVELOPMENT){
        console.info('Registration token: ', token.value);
      }

      const newToken = token.value;
      if (newToken) {
        authUpdateFirebaseToken.fetch({ firebaseToken: newToken });
      }
    });

    await PushNotifications.addListener('registrationError', (err) => {
      if(DEVELOPMENT){
        console.error('Registration error: ', err.error);
      }
    });

    await PushNotifications.addListener('pushNotificationReceived', (notification) => {
      if(DEVELOPMENT){
        console.log('Push notification received: ', notification);
      }

      if (notification) {
        //@ts-expect-error ignore
        onUpdateNotification(notification);
      }

    });

    await PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      if(DEVELOPMENT)(
        console.log(
          'Push notification action performed',
          notification.actionId,
          notification.inputValue,
        )
      )


    });
  };

  const registerNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    await PushNotifications.register();
  };

  // const getDeliveredNotifications = async () => {
  //   const notificationList = await PushNotifications.getDeliveredNotifications();
  //   console.log('delivered notifications', notificationList);
  // };

  useEffect(() => {
    if (isAuthenticated) {
      init();
    }

    return () => {
      PushNotifications.removeAllListeners();
    };
  }, [isAuthenticated]);

  return null;
};

export default NotificationsProviderNative;
