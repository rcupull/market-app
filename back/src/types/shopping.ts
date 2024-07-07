import { Schema } from 'mongoose';
import { Address, BaseIdentity } from './general';
import { Post, PostPurshaseNotes } from './post';
import { BusinessCurrency } from './business';
import { BillState } from './billing';

export enum ShoppingState {
  CONSTRUCTION = 'CONSTRUCTION',
  REQUESTED = 'REQUESTED',
  APPROVED = 'APPROVED',
  PROCESSING = 'PROCESSING',
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
  billId: Schema.Types.ObjectId | undefined;
  billState: BillState | undefined;

  purchaserName: string | undefined;
  purchaserAddress: Address | undefined;
  purchaserPhone: string | undefined;
}
