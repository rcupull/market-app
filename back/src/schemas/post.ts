import { Schema, model, PaginateModel } from "mongoose";
import { Post } from "../types/post";
import mongoosePaginate from "mongoose-paginate-v2";
import { createdAtSchemaDefinition } from "../utils/schemas";
import { BusinessModel } from "./business";
import { PostPageLayoutSchema } from "./common";

export const PostSchema = new Schema<Post>({
  ...createdAtSchemaDefinition,
  routeName: { type: String, required: true },
  currency: { type: String, enum: ["CUP", "MLC", "USD"] },
  description: { type: String },
  details: { type: String },
  hidden: { type: Boolean, default: false },
  hiddenBusiness: { type: Boolean, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  postCategoriesTags: { type: [String] },
  images: {
    type: [
      {
        src: { type: String, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
      },
    ],
  },
  clothingSizes: [
    {
      type: String,
      enum: ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
    },
  ],
  colors: [
    {
      type: String,
      enum: ["white", "gray", "black"],
      required: true,
    },
  ],
  reviews: { type: [Number], default: [0, 0, 0, 0, 0] },
  name: { type: String, required: true },
  price: { type: Number },
  discount: { type: Number },
  stockAmount: { type: Number, default: null },
  postPageLayout: {
    type: PostPageLayoutSchema,
  },
});

PostSchema.plugin(mongoosePaginate);

PostSchema.pre("save", async function (next) {
  try {
    const out = await BusinessModel.findOne({
      routeName: this.routeName,
    });
    this.hiddenBusiness = out?.hidden;
  } catch (err: any) {
    next();
  }
});

export const PostModel = model<Post, PaginateModel<Post>>(
  "Post",
  PostSchema,
  "posts"
);
