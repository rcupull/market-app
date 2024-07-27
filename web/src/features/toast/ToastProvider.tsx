import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { ChildrenProp } from 'types/general';

export const ToastProvider = ({ children }: ChildrenProp) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};
