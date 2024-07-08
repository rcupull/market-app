import { Schema } from 'mongoose';
import { BaseIdentity } from './general';

export enum ReviewType {
  PRODUCT = 'PRODUCT',
  BUSINESS = 'BUSINESS',
}

export interface Review extends BaseIdentity {
  type: ReviewType;
  reviewerId: Schema.Types.ObjectId;
  reviewed: string; // productId or business routeName
  star?: number;
  comment?: string;
}

export interface ReviewDto extends Review {
  reviewerName?: string;
}

export interface ReviewSummary {
  starSummary: [number, number, number, number, number];
  reviewerIds: Array<string>;
}
