import { NotificationsProvider } from 'features/notifications';
import { PersistentProvider } from 'features/persistent';
import { ReduxProvider } from 'features/redux';

import { RouterProvider } from 'hooks/useRouter/RouterProvider';

import { ModalContainer } from './features/modal';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <PersistentProvider>
      <ReduxProvider>
        <RouterProvider>
          <NotificationsProvider>
            <ModalContainer />
            {children}
          </NotificationsProvider>
        </RouterProvider>
      </ReduxProvider>
    </PersistentProvider>
  );
};
