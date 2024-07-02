import { createSimpleSlice } from './utils';

import { ReduxState } from 'types/redux';

export const slices = {
  useBusiness: createSimpleSlice<ReduxState['useBusiness']>('useBusiness', null),
  useShopping: createSimpleSlice<ReduxState['useShopping']>('useShopping', null),
  useShoppingIdPersistent: createSimpleSlice<ReduxState['useShoppingIdPersistent']>(
    'useShoppingIdPersistent',
    null
  ),
  usePostIdPersistent: createSimpleSlice<ReduxState['usePostIdPersistent']>(
    'usePostIdPersistent',
    null
  ),
  //
  modal_catalogsSearchImage: createSimpleSlice<ReduxState['modal_catalogsSearchImage']>(
    'modal_catalogsSearchImage',
    null
  ),
  //
  useCallFromAfar: createSimpleSlice<ReduxState['useCallFromAfar']>('useCallFromAfar', []),
  emergentModals: createSimpleSlice<ReduxState['emergentModals']>('emergentModals', []),
  //
  useAllUserBusiness: createSimpleSlice<ReduxState['useAllUserBusiness']>(
    'useAllUserBusiness',
    null
  ),
  useAdminConfig: createSimpleSlice<ReduxState['useAdminConfig']>('useAdminConfig', null),
  useAuth: createSimpleSlice<ReduxState['useAuth']>('useAuth', null),
  useSignOut: createSimpleSlice<ReduxState['useSignOut']>('useSignOut', null),
};
