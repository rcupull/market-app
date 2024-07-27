import { toast } from 'react-toastify';

import { renderToastMessage } from './utils';

import { ToastMessage } from 'types/toast';

export const useNotifications = () => {
  const showMessage = (toastMessage: ToastMessage) => {
    toast(renderToastMessage(toastMessage));
  };

  return {
    showMessage,
  };
};
