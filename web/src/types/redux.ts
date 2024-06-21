import { SliceApiPersistentState } from './api';
import { AuthData } from './auth';

export interface ReduxState {
  useBusiness: SliceApiPersistentState;
  useShopping: SliceApiPersistentState;
  useShoppingIdPersistent: SliceApiPersistentState;
  usePostIdPersistent: SliceApiPersistentState;
  //
  modal_catalogsSearchImage: any;
  //
  useCallFromAfar: Array<any>;
  emergentModals: Array<any>;
  //
  useAllUserBusiness: SliceApiPersistentState;
  useAdminConfig: SliceApiPersistentState;
  useAuth: SliceApiPersistentState<AuthData>;
  useSignOut: SliceApiPersistentState;
}
