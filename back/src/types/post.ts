import { Schema } from "mongoose";
import { BaseIdentity, Image } from "./general";
import { PostPageLayout } from "./business";

export type PostType = "product" | "link"; // el tipo de publicaciones que posee

export type PostCurrency = "CUP" | "MLC" | "USD";

export type PostColor =
  | "white"
  | "gray"
  | "black"
  | "blue"
  | "red"
  | "green"
  | "purple"
  | "orange"
  | "yellow"
  | "slate"
  | "pink"
  | "fuchsia"
  | "violet"
  | "cyan"
  | "teal";

export type PostClothingSize =
  | "XXS"
  | "XS"
  | "S"
  | "M"
  | "L"
  | "XL"
  | "2XL"
  | "3XL";

export type PostReviews = [number, number, number, number, number];

export interface PostPurshaseNotes {
  interestedByColors?: Array<PostColor>;
  interestedByClothingSizes?: Array<PostClothingSize>;
}

export type PostLinkType = "business" | "external";

export interface Post extends BaseIdentity {
  images?: Array<Image>;
  routeName: string; // routeName from business
  createdBy: Schema.Types.ObjectId;
  description?: string;
  details?: string;
  name: string;
  price?: number;
  discount?: number;
  currency?: PostCurrency;
  reviews?: PostReviews;
  colors?: Array<PostColor>;
  highlights?: Array<string>;
  hidden?: boolean;
  hiddenBusiness?: boolean;
  postCategoriesTags?: Array<string>;
  stockAmount?: number;
  // clothing
  clothingSizes?: Array<PostClothingSize>;
  //
  postPageLayout?: PostPageLayout;

  postType?: PostType;

  /**
   * the link when the postType === "link"
   */
  postLink?: {
    type: PostLinkType;
    value: string;
  };
}
