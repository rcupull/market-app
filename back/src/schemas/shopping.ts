import { PaginateModel, Schema, model } from "mongoose";
import { createdAtSchemaDefinition } from "../utils/schemas";
import { Shopping } from "../types/shopping";
import { PostSchema } from "./post";

const ShoppingSchema = new Schema<Shopping>({
  ...createdAtSchemaDefinition,
  posts: {
    type: [
      {
        _id: false,
        post: { type: PostSchema, required: true },
        count: { type: Number, required: true },
        lastUpdatedDate: { type: Date, required: true },
      },
    ],
  },
  purchaserId: { type: String, required: true },
  purchaserName: { type: String, required: true },
  routeName: { type: String, required: true },
  state: { type: String, enum: ["CONSTRUCTION", "REQUESTED"], required: true },
});

export const ShoppingModel = model<Shopping>(
  "Shopping",
  ShoppingSchema,
  "shopping"
);
