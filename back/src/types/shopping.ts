import { Schema } from 'mongoose';
import { BaseIdentity } from './general';
import { Post, PostPurshaseNotes } from './post';
import { BusinessCurrency } from './business';
import { BillState } from './billing';

export enum ShoppingState {
  CONSTRUCTION = 'CONSTRUCTION',
  REQUESTED = 'REQUESTED',
  APPROVED = 'APPROVED',
  PROCESSING = 'PROCESSING',
  READY_TO_DELIVER = 'READY_TO_DELIVER',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
  REJECTED = 'REJECTED',
}

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
}

export interface ShoppingDto extends Shopping {
  billId?: Schema.Types.ObjectId;
  billState?: BillState;
}
