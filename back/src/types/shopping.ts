import { Schema } from 'mongoose';
import { BaseIdentity } from './general';
import { Post, PostPurshaseNotes } from './post';
import { BusinessCurrency } from './business';

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
    purshaseNotes?: PostPurshaseNotes;
    count: number;
    lastUpdatedDate: Date;
  }>;
  //
  purchaserId: string;
  purchaserName: string;
  //
  routeName: string;
  currency: BusinessCurrency;
  //
  state: ShoppingState;
  history?: Array<{
    state: ShoppingState;
    lastUpdatedDate: Date;
  }>;
  //
  billId?: Schema.Types.ObjectId;
}
