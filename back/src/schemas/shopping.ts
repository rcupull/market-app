import { PaginateModel, Schema, SchemaDefinition, model } from 'mongoose';
import { createdAtSchemaDefinition } from '../utils/schemas';
import { Shopping } from '../types/shopping';
import { PostSchema } from './post';
import { PostPurshaseNotes } from '../types/post';
import mongoosePaginate from 'mongoose-paginate-v2';

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

const ShoppingSchema = new Schema<Shopping>({
  ...createdAtSchemaDefinition,
  posts: {
    type: [
      {
        _id: false,
        post: { type: PostSchema, required: true },
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
  state: {
    type: String,
    enum: ['CONSTRUCTION', 'REQUESTED', 'DELIVERED', 'CANCELED', 'REJECTED'],
    required: true,
  },
  history: {
    type: [
      {
        state: {
          type: String,
          enum: ['CONSTRUCTION', 'REQUESTED', 'DELIVERED', 'CANCELED', 'REJECTED'],
          required: true,
        },
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
  'shopping'
);
