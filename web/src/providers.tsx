
import { NotificationsProvider } from 'features/notifications';
import { ReduxProvider } from 'features/redux';

import { RouterProvider } from 'hooks/useRouter/RouterProvider';

import { CookiesService } from './features/cookies';
import { ModalContainer } from './features/modal';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CookiesService>
      <ReduxProvider>
        <RouterProvider>
          <NotificationsProvider>
            <ModalContainer />
            {children}
          </NotificationsProvider>
        </RouterProvider>
      </ReduxProvider>
    </CookiesService>
  );
};
