import { useToast } from 'features/toast/useToast';
import { notificationToToastMessage } from 'features/toast/utils';

import { MessagePayload } from 'firebase/messaging';
import { PushNotification } from 'types/notifications';

export const useNotificationsUtils = () => {
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
