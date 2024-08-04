import { usePlatform } from 'hooks/useCapacitor';

import { initialPersistentState } from './Context';
import { usePersistentContext } from './usePersistentContext';

import { ChildrenProp } from 'types/general';
import { dynamic } from 'utils/makeLazy';

const PersistentProviderNative = dynamic(() => import('./PersistentProviderNative').then((m) => m));
const PersistentProviderWeb = dynamic(() => import('./PersistentProviderWeb').then((m) => m));

export let persistentBackdoor = initialPersistentState;

const BackdoorFactory = () => {
  persistentBackdoor = usePersistentContext();
  return null;
};

export const PersistentProvider = ({ children }: ChildrenProp) => {
  const { platformToggle } = usePlatform();

  const CookiesProviderPlatform = platformToggle({
    native: PersistentProviderNative,
    web: PersistentProviderWeb
  });

  return (
    <CookiesProviderPlatform>
      <BackdoorFactory />
      {children}
    </CookiesProviderPlatform>
  );
};
