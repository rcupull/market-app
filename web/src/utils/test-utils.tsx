import { BrowserRouter } from 'react-router-dom';

import { ModalContainer } from 'features/modal';
import { NotificationsProvider } from 'features/notifications';
import { PersistentProvider } from 'features/persistent';
import { ReduxProvider } from 'features/redux';

import { ReduxState } from 'types/redux';

export const getWrapper = ({
  useNotifications,
  useRedux,
  useRouter,
  useModal,
  useCookies,
  initialReduxState,
}: {
  useRedux?: boolean;
  useModal?: boolean;
  useRouter?: boolean;
  useNotifications?: boolean;
  useCookies?: boolean;
  initialReduxState?: Partial<ReduxState>;
}) => {
  return ({ children }: { children: React.ReactNode }) => {
    let out = <>{children}</>;

    if (useModal) {
      out = (
        <>
          <ModalContainer />
          {out}
        </>
      );
    }

    if (useNotifications) {
      out = <NotificationsProvider>{out}</NotificationsProvider>;
    }

    if (useRouter) {
      out = <BrowserRouter>{out}</BrowserRouter>;
    }

    if (useRedux || useModal) {
      out = <ReduxProvider initialState={initialReduxState}>{out}</ReduxProvider>;
    }

    if (useCookies) {
      out = <PersistentProvider>{out}</PersistentProvider>;
    }

    return out;
  };
};
