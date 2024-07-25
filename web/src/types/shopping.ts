import { BillState } from './billing';
import { BusinessCurrency, DeliveryConfigType } from './business';
import { Address, BaseIdentity } from './general';
import { Post, PostPurshaseNotes } from './post';

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

export type ShoppingStateHistory = Array<{
  state: ShoppingState;
  lastUpdatedDate: string;
}>;

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
  lastUpdatedDate: string;
}

export interface Shopping extends BaseIdentity {
  posts: Array<ShoppingPostMeta>;
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

  delivery?: ShoppingDelivery;
}
