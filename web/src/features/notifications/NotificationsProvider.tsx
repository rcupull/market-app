import { usePlatform } from 'hooks/useCapacitor';

import { NotificationsProviderMobile } from './NotificationsProviderMobile';
import { NotificationsProviderWeb } from './NotificationsProviderWeb';

import { ChildrenProp } from 'types/general';

export const NotificationsProvider = ({ children }: ChildrenProp) => {
  const { platformToggle } = usePlatform();

  const Provider = platformToggle({
    native: NotificationsProviderMobile,
    web: NotificationsProviderWeb,
  });

  return (
    <>
      <Provider />
      {children}
    </>
  );
};
