import { NotificationsProvider } from 'features/notifications';
import { PersistentProvider } from 'features/persistent';
import { ReduxProvider } from 'features/redux';

import { RouterProvider } from 'hooks/useRouter/RouterProvider';
const NativeBehavior = dynamic(() => import('./features/native/NativeBehavior').then((m) => m));

import { ToastProvider } from 'features/toast';

import { usePlatform } from 'hooks/useCapacitor';

import { ModalContainer } from './features/modal';

import { dynamic } from 'utils/makeLazy';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const { isNative } = usePlatform();

  return (
    <PersistentProvider>
      <ReduxProvider>
        <RouterProvider>
          <NotificationsProvider>
            <ToastProvider>
              {isNative && <NativeBehavior />}
              <ModalContainer />
              {children}
            </ToastProvider>
          </NotificationsProvider>
        </RouterProvider>
      </ReduxProvider>
    </PersistentProvider>
  );
};
