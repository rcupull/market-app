import { PaginateModel, Schema, model } from 'mongoose';
import { createdAtSchemaDefinition } from '../utils/schemas';
import mongoosePaginate from 'mongoose-paginate-v2';
import { PushNotification, PushNotificationType } from '../types/notifications';

const PushNotificationShema = new Schema<PushNotification>({
  ...createdAtSchemaDefinition,
  type: { type: String, enum: Object.values(PushNotificationType), required: true },
  userIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  businessName: { type: String },
  postId: { type: String },
  routeName: { type: String },
  shoppingId: { type: String },
  stockAmountAvailable: { type: Number },
  readAt: { type: Date }
});

PushNotificationShema.plugin(mongoosePaginate);

export const PushNotificationModel = model<PushNotification, PaginateModel<PushNotification>>(
  'PushNotification',
  PushNotificationShema,
  'push_notification'
);
