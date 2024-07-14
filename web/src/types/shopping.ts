import { BillState } from './billing';
import { BusinessCurrency, DeliveryConfigType } from './business';
import { Address, BaseIdentity } from './general';
import { Post } from './post';

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

  delivery?: ShoppingDelivery;
}
