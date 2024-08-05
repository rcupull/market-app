import { PaginateModel, Schema, SchemaDefinition, model } from 'mongoose';
import { createdAtSchemaDefinition } from '../utils/schemas';
import { Shopping, ShoppingDelivery, ShoppingPostData, ShoppingState } from '../types/shopping';
import { PostPurshaseNotes } from '../types/post';
import mongoosePaginate from 'mongoose-paginate-v2';
import { DeliveryConfigType } from '../types/business';

const shoppingState = {
  type: String,
  enum: Object.values(ShoppingState),
  required: true
};

const purshaseNotesSchemaDefinition: SchemaDefinition<PostPurshaseNotes> = {
  interestedByClothingSizes: {
    _id: false,
    type: [String]
  },
  interestedByColors: {
    _id: false,
    type: [String]
  }
};

const shoppingDeliverySchemaDefinition: SchemaDefinition<ShoppingDelivery> = {
  deliveryType: { type: String, enum: Object.values(DeliveryConfigType) },
  distance: { type: Number },
  price: { type: Number }
};

const postDataSchemaDefinition: SchemaDefinition<ShoppingPostData> = {
  _id: { type: String, required: true },
  images: {
    type: [
      {
        src: { type: String, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true }
      }
    ]
  },
  name: { type: String, required: true },
  price: { type: Number, required: true }
};

const ShoppingSchema = new Schema<Shopping>({
  ...createdAtSchemaDefinition,
  posts: {
    type: [
      {
        _id: false,
        postData: { type: postDataSchemaDefinition, required: true },
        count: { type: Number, required: true },
        lastUpdatedDate: { type: Date, required: true },
        purshaseNotes: {
          _id: false,
          type: purshaseNotesSchemaDefinition
        }
      }
    ]
  },
  purchaserId: { type: String, required: true },
  routeName: { type: String, required: true },
  currency: { type: String, required: true, enum: ['CUP', 'MLC', 'USD'] },
  state: shoppingState,
  history: {
    type: [
      {
        _id: false,
        state: shoppingState,
        lastUpdatedDate: {
          type: Date
        }
      }
    ]
  },
  delivery: shoppingDeliverySchemaDefinition
});

ShoppingSchema.plugin(mongoosePaginate);

export const ShoppingModel = model<Shopping, PaginateModel<Shopping>>(
  'Shopping',
  ShoppingSchema,
  'shopping'
);
