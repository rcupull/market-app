import { usePlatform } from 'hooks/useCapacitor';

import { initialPersistentState } from './Context';
import { PersistentProviderWeb } from './PersistentProviderWeb';
import { usePersistentContext } from './usePersistentContext';

import { ChildrenProp } from 'types/general';

export let persistentBackdoor = initialPersistentState;

const BackdoorFactory = () => {
  persistentBackdoor = usePersistentContext();
  return null;
};

export const PersistentProvider = ({ children }: ChildrenProp) => {
  const { platformToggle } = usePlatform();

  const CookiesProviderPlatform = platformToggle({
    native: PersistentProviderWeb, //TODO
    web: PersistentProviderWeb,
  });

  return (
    <CookiesProviderPlatform>
      <BackdoorFactory />
      {children}
    </CookiesProviderPlatform>
  );
};
