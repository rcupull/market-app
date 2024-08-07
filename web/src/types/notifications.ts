import { BaseIdentity } from './general';

export enum PushNotificationType {
  POST_AMOUNT_STOCK_CHANGE = 'POST_AMOUNT_STOCK_CHANGE',
  NEW_ORDER_WAS_CREATED = 'NEW_ORDER_WAS_CREATED',
  ORDER_WAS_APPROVED = 'ORDER_WAS_APPROVED',
  ORDER_IN_CONSTRUCTION_WAS_REMOVED = 'ORDER_IN_CONSTRUCTION_WAS_REMOVED'
}

export interface PushNotification extends BaseIdentity {
  type: PushNotificationType;
  userIds: Array<string>;
  //
  postId?: string;
  shoppingId?: string;
  stockAmountAvailable?: number;
  routeName?: string;
  businessName?: string;
  //
  readAt?: string;
}
