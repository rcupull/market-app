import { PaginatedData, SliceApiPersistentState } from './api';
import { AuthData } from './auth';
import { Shopping } from './shopping';

export interface ReduxState {
  useBusiness: SliceApiPersistentState;
  useCart: SliceApiPersistentState<PaginatedData<Shopping>>;
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
