export type NotificationType = 'POST_AMOUNT_STOCK_CHANGE' | 'NEW_ORDER_WAS_CREATED';

export interface NotificationPayload {
  type: NotificationType;
  //
  postId?: string;
  shoppingId?: string;
  stockAmount?: number;
  routeName?: string;
  //
}
