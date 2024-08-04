import { usePlatform } from 'hooks/useCapacitor';

import { ChildrenProp } from 'types/general';
import { dynamic } from 'utils/makeLazy';

const NotificationsProviderNative = dynamic(() =>
  import('./NotificationsProviderNative').then((m) => m)
);
const NotificationsProviderWeb = dynamic(() => import('./NotificationsProviderWeb').then((m) => m));

export const NotificationsProvider = ({ children }: ChildrenProp) => {
  const { platformToggle } = usePlatform();

  const Provider = platformToggle({
    native: NotificationsProviderNative,
    web: NotificationsProviderWeb
  });

  return (
    <>
      <Provider />
      {children}
    </>
  );
};
