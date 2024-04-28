import { createSimpleSlice } from './utils';

export const slices = {
  useBusiness: createSimpleSlice('useBusiness', null),
  useShopping: createSimpleSlice('useShopping', null),
  useShoppingIdPersistent: createSimpleSlice('useShoppingIdPersistent', null),
  usePostIdPersistent: createSimpleSlice('usePostIdPersistent', null),
  //
  modal_catalogsSearchImage: createSimpleSlice('modal_catalogsSearchImage', null),
  //
  useCallFromAfar: createSimpleSlice<Array<any>>('useCallFromAfar', []),
  emergentModals: createSimpleSlice<Array<any>>('emergentModals', []),
  //
  useAllUserBusiness: createSimpleSlice<null>('useAllUserBusiness', null),
  useAuth: createSimpleSlice<null>('useAuth', null),
};
