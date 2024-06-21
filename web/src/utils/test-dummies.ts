import { Portal } from 'hooks/usePortal';

import { User } from 'types/auth';
import { Shopping } from 'types/shopping';

export const dummiPortal: Portal = {
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
