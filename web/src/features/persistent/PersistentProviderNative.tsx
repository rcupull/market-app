import { PersistentContext } from './Context';
import { PersistentUtils } from './types';

import { Preferences } from '@capacitor/preferences';
import { ChildrenProp } from 'types/general';

const PersistentProviderNative = ({ children }: ChildrenProp) => {
  const setPersistent: PersistentUtils['setPersistent'] = async (key, value) => {
    await Preferences.set({
      key,
      value: JSON.stringify(value),
    });
  };

  const getPersistent: PersistentUtils['getPersistent'] = async (key) => {
    const { value } = await Preferences.get({ key });
    return value ? JSON.parse(value) : null;
  };

  const removePersistent: PersistentUtils['removePersistent'] = async (key) => {
    await Preferences.remove({ key });
  };

  return (
    <PersistentContext.Provider
      value={{
        getPersistent,
        removePersistent,
        setPersistent,
      }}
    >
      {children}
    </PersistentContext.Provider>
  );
};

export default PersistentProviderNative;
