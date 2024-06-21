import { BrowserRouter } from 'react-router-dom';

import { CookiesService } from 'features/cookies';
import { ModalContainer } from 'features/modal';
import { NotificationsProvider } from 'features/notifications';
import { ReduxProvider } from 'features/redux';

export const getWrapper = ({
  useNotifications,
  useRedux,
  useRouter,
  useModal,
  useCookies
}: {
  useRedux?: boolean;
  useModal?: boolean;
  useRouter?: boolean;
  useNotifications?: boolean;
  useCookies?: boolean;
}) => {

  return ({ children }: {children: React.ReactNode}) => {
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
      out = <ReduxProvider>{out}</ReduxProvider>;
    }

    if (useCookies) {
      out = <CookiesService>{out}</CookiesService>;
    }

    return out;
  };
};
