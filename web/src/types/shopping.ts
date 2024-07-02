import { BillState } from './billing';
import { BusinessCurrency } from './business';
import { Address, BaseIdentity } from './general';
import { Post } from './post';

export type ShoppingState =
  | 'CONSTRUCTION'
  | 'REQUESTED'
  | 'APPROVED'
  | 'PROCESSING'
  // | 'READY_TO_DELIVER'
  | 'DELIVERED'
  //
  | 'CANCELED'
  | 'REJECTED';

export type ShoppingPostData = Pick<Post, '_id' | 'price' | 'images' | 'name'>;

export type ShoppingStateHistory = Array<{
  state: ShoppingState;
  lastUpdatedDate: string;
}>;

export interface Shopping extends BaseIdentity {
  posts: Array<{
    postData: ShoppingPostData;
    count: number;
    lastUpdatedDate: string;
  }>;
  purchaserId: string;
  routeName: string;
  currency: BusinessCurrency;
  state: ShoppingState;
  history?: ShoppingStateHistory;
  // hot values
  billId?: string;
  billState?: BillState;
  purchaserName?: string;
  purchaserAddress?: Address;
  purchaserPhone?: string;
}
