import { Portal } from 'hooks/usePortal';

import { AdminConfig } from 'types/admin';
import { AuthData, User } from 'types/auth';
import { Business } from 'types/business';
import { Shopping } from 'types/shopping';

export const portalDummy: Portal = {
  getPortal: jest.fn(),
  ref: jest.fn(),
};

export const userDummy: User = {
  _id: '1',
  name: 'test',
  email: 'test',
  role: 'user',
  createdAt: 'test',
  canCreateBusiness: true,
  validated: true,
};

export const shoppingDummy: Shopping = {
  _id: 'id',
  createdAt: 'createdAt',
  currency: 'USD',
  posts: [],
  purchaserId: 'purchaserId',
  purchaserName: 'purchaserName',
  routeName: 'routeName',
  state: 'CONSTRUCTION',
  billId: 'billId',
  billState: 'PENDING_TO_PAY',
  history: [],
};
export const businessDummy: Business = {
  _id: 'id',
  createdAt: 'createdAt',
  currency: 'USD',
  categories: [],
  createdBy: 'createdBy',
  name: 'name',
  routeName: 'routeName',
  shoppingPayment: {
    history: [],
    totalDebit: 0,
    requests: [],
  },
};

export const adminConfigDummy: AdminConfig = {
  _id: 'id',
  createdAt: 'createdAt',
  price: '<>price</>',
  privacyPolicy: '<>privacyPolicy</>',
  termsAndConditions: '<>termsAndConditions</>',
};

export const authDataDummy: AuthData = {
  user: userDummy,
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
};
