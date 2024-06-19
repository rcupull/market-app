import { BillState } from './billing';
import { BaseIdentity } from './general';
import { Post, PostCurrency } from './post';

export type ShoppingState =
  | 'CONSTRUCTION'
  | 'REQUESTED'
  | 'PROCESSING'
  | 'READY_TO_DELIVER'
  | 'DELIVERED'
  //
  | 'CANCELED'
  | 'REJECTED';

export type ShoppingPostData = Pick<Post, '_id' | 'price' | 'images' | 'name'>;

export interface Shopping extends BaseIdentity {
  posts: Array<{
    postData: ShoppingPostData;
    count: number;
    lastUpdatedDate: Date;
  }>;
  purchaserId: string;
  purchaserName: string;
  routeName: string;
  currency: PostCurrency;
  state: ShoppingState;
  history?: Array<{
    state: ShoppingState;
    lastUpdatedDate: string;
  }>;
  billId?: string;
  billState?: BillState;
}
