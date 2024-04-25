import { BrowserRouter } from 'react-router-dom';

import { NotificationsProvider } from 'features/notifications';
import { ReduxProvider } from 'features/redux';

import { CookiesService } from './features/cookies';
import { ModalContainer } from './features/modal';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CookiesService>
      <ReduxProvider>
        <BrowserRouter>
          <NotificationsProvider>
            <ModalContainer />
            {children}
          </NotificationsProvider>
        </BrowserRouter>
      </ReduxProvider>
    </CookiesService>
  );
};
