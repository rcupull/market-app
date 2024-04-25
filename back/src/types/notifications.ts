export type NotificationType = "POST_AMOUNT_STOCK_CHANGE";

export interface NotificationToUpdatePayload {
  type: NotificationType;
  //
  postId?: string;
  stockAmount?: number;
  //
}
