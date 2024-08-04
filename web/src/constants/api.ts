import { AdminConfig } from 'types/admin';
import { FetchResource, FetchStatus } from 'types/api';

export const dummyStatus: FetchStatus = {
  error: null,
  isBusy: false,
  isFailed: false,
  isNotStarted: true,
  isSuccess: false,
  wasCalled: false
};

export const dummyAdminAconfig: AdminConfig = {
  _id: '_id',
  createdAt: 'createdAt',
  features: [],
  price: '<div>price</div>',
  privacyPolicy: '<div>privacyPolicy</div>',
  termsAndConditions: '<div>termsAndConditions</div>'
};

export const dummyFetchResource: FetchResource<any> = {
  data: null,
  fetch: () => {},
  status: dummyStatus,
  reset: () => {}
};

export const defaultLimit = 10;
