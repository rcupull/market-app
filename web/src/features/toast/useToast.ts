import { toast, ToastOptions } from 'react-toastify';

import { renderToastMessage } from './utils';

import { ToastMessage } from 'types/toast';

const defaultOptions: ToastOptions = {
  type: 'success',
  position: 'top-right',
  autoClose: 5000,
  closeButton: true,
  closeOnClick: true
};

export const useToast = () => {
  const showMessage = (toastMessage: ToastMessage, options: ToastOptions = {}) => {
    toast(renderToastMessage(toastMessage), {
      ...defaultOptions,
      ...options
    });
  };

  return {
    showMessage
  };
};
