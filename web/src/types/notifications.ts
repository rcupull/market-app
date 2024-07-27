export type NotificationType =
  | 'POST_AMOUNT_STOCK_CHANGE'
  | 'NEW_ORDER_WAS_CREATED'
  | 'ORDER_IN_CONSTRUCTION_WAS_REMOVED';

export interface NotificationPayload {
  type: NotificationType;
  //
  postId?: string;
  shoppingId?: string;
  stockAmountAvailable?: number;
  routeName?: string;
  //
}
