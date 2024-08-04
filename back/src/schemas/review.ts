import { PaginateModel, Schema, model } from 'mongoose';
import { createdAtSchemaDefinition } from '../utils/schemas';
import { Review, ReviewType } from '../types/reviews';
import mongoosePaginate from 'mongoose-paginate-v2';

const ReviewShema = new Schema<Review>({
  ...createdAtSchemaDefinition,
  comment: { type: String },
  reviewerId: { type: Schema.Types.ObjectId, required: true },
  reviewed: { type: String, required: true },
  star: { type: Number },
  type: { type: String, enum: Object.values(ReviewType), required: true }
});

ReviewShema.plugin(mongoosePaginate);

export const ReviewModel = model<Review, PaginateModel<Review>>('Review', ReviewShema, 'reviews');
