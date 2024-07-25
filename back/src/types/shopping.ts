import { Schema } from 'mongoose';
import { Address, BaseIdentity } from './general';
import { Post, PostPurshaseNotes } from './post';
import { BusinessCurrency, DeliveryConfigType } from './business';
import { BillState } from './billing';

export enum ShoppingState {
  CONSTRUCTION = 'CONSTRUCTION',
  REQUESTED = 'REQUESTED',
  APPROVED = 'APPROVED',
  PROCESSING = 'PROCESSING',
  READY_TO_DELIVERY = 'READY_TO_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
  REJECTED = 'REJECTED',
}

export type ShoppingPostData = Pick<Post, '_id' | 'price' | 'images' | 'name'>;

export interface ShoppingDelivery {
  deliveryType: DeliveryConfigType;
  price: number;
  //
  distance: number;
}

export interface ShoppingPostMeta {
  postData: ShoppingPostData;
  count: number;
  purshaseNotes?: PostPurshaseNotes;
  lastUpdatedDate: Date;
}

export interface Shopping extends BaseIdentity {
  posts: Array<ShoppingPostMeta>;
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

  delivery?: ShoppingDelivery;
}

export interface ShoppingDto extends Shopping {
  billId: Schema.Types.ObjectId | undefined;
  billState: BillState | undefined;

  purchaserName: string | undefined;
  purchaserAddress: Address | undefined;
  purchaserPhone: string | undefined;
}
