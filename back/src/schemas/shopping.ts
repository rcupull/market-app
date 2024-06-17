import { PaginateModel, Schema, SchemaDefinition, model } from 'mongoose';
import { createdAtSchemaDefinition } from '../utils/schemas';
import { Shopping, ShoppingPostData } from '../types/shopping';
import { PostPurshaseNotes } from '../types/post';
import mongoosePaginate from 'mongoose-paginate-v2';

const shoppingState = {
  type: String,
  enum: [
    'CONSTRUCTION',
    'REQUESTED',
    'PROCESSING',
    'READY_TO_DELIVER',
    'DELIVERED',
    //
    'CANCELED',
    'REJECTED',
  ],
  required: true,
};

const purshaseNotesSchemaDefinition: SchemaDefinition<PostPurshaseNotes> = {
  interestedByClothingSizes: {
    _id: false,
    type: [String],
  },
  interestedByColors: {
    _id: false,
    type: [String],
  },
};

const postDataSchemaDefinition: SchemaDefinition<ShoppingPostData> = {
  _id: { type: String, required: true },
  routeName: { type: String, required: true },
  currency: { type: String, required: true, enum: ['CUP', 'MLC', 'USD'] },
  images: {
    type: [
      {
        src: { type: String, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
      },
    ],
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
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
          type: purshaseNotesSchemaDefinition,
        },
      },
    ],
  },
  purchaserId: { type: String, required: true },
  purchaserName: { type: String, required: true },
  routeName: { type: String, required: true },
  state: shoppingState,
  history: {
    type: [
      {
        state: shoppingState,
        lastUpdatedDate: {
          type: Date,
        },
      },
    ],
  },
});

ShoppingSchema.plugin(mongoosePaginate);

export const ShoppingModel = model<Shopping, PaginateModel<Shopping>>(
  'Shopping',
  ShoppingSchema,
  'shopping',
);
