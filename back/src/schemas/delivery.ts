import { PaginateModel, Schema, model } from 'mongoose';
import { createdAtSchemaDefinition } from '../utils/schemas';
import { Delivery } from '../types/delivery';
import mongoosePaginate from 'mongoose-paginate-v2';

///////////////////////////////////////////////////////////////////////////////

const DeliveryShema = new Schema<Delivery>({
  ...createdAtSchemaDefinition,
  price: { type: Number, required: true },
  routeName: { type: String, required: true },
  shoppingId: { type: Schema.Types.ObjectId, ref: 'Shopping', required: true },
  deliveryManId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  currency: { type: String, enum: ['CUP', 'MLC', 'USD'], required: true },
});

DeliveryShema.plugin(mongoosePaginate);

export const DeliveryModel = model<Delivery, PaginateModel<Delivery>>(
  'Delivery',
  DeliveryShema,
  'deliveries',
);
