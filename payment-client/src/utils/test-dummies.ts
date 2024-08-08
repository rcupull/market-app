import { Portal } from 'hooks/usePortal';

import { AdminConfig } from 'types/admin';
import { Paginator } from 'types/api';
import { AuthData, User } from 'types/auth';
import { Business } from 'types/business';
import { Shopping, ShoppingState } from 'types/shopping';

export const portalDummy: Portal = {
  getPortal: jest.fn(),
  ref: jest.fn()
};

export const userDummy: User = {
  _id: '1',
  name: 'test',
  email: 'test',
  role: 'user',
  createdAt: 'test',
  canCreateBusiness: true,
  validated: true
};

export const paginatorDummy: Paginator = {
  dataCount: 0,
  hasNextPage: true,
  hasPrevPage: false,
  limit: 10,
  offset: 30,
  page: 1,
  pageCount: 2,
  pagingCounter: 5,
  nextPage: undefined,
  prevPage: undefined
};

export const shoppingDummy: Shopping = {
  _id: 'id',
  createdAt: 'createdAt',
  currency: 'USD',
  posts: [
    {
      postData: {
        _id: 'someid',
        name: 'Chancletas de palo',
        images: [],
        price: 50
      },
      count: 4,
      lastUpdatedDate: '2024-06-25T15:47:05.649Z'
    }
  ],
  purchaserId: 'purchaserId',
  purchaserName: 'purchaserName',
  routeName: 'routeName',
  state: ShoppingState.CONSTRUCTION,
  billId: 'billId',
  billState: 'PENDING_TO_PAY',
  history: []
};

export const businessDummy: Business = {
  _id: 'id',
  createdAt: 'createdAt',
  currency: 'USD',
  createdBy: 'createdBy',
  name: 'name',
  routeName: 'routeName',
  shoppingDebit: 0
};

export const adminConfigDummy: AdminConfig = {
  _id: 'id',
  createdAt: 'createdAt',
  price: '<>price</>',
  privacyPolicy: '<>privacyPolicy</>',
  termsAndConditions: '<>termsAndConditions</>'
};

export const authDataDummy: AuthData = {
  user: userDummy
};
