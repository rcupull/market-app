import { BaseIdentity, Image } from "./general";
import mongose from "mongoose";
import { Post } from "./post";

export type BusinessCategory = "food" | "tool" | "clothing" | "service";

export type PostsLayoutSectionType = "grid" | "oneRowSlider";

export type BannerLayoutType = "none" | "static" | "swipableClassic";
export type SearchLayoutType =
  | "none"
  | "left"
  | "center"
  | "right"
  | "postCategories"
  | "postCategoriesScrollable"
  | "postCategoriesExcluded"
  | "postCategoriesExcludedScrollable";

export type FooterLayoutType = "none" | "basic";

export interface PostsLayoutSection {
  name: string;
  showIn?: Array<"businessPage" | "postPage">;

  hiddenName?: boolean;
  //
  searchLayout?: SearchLayoutType;
  //
  postCategoriesTags?: Array<string>;
  //
  type: PostsLayoutSectionType;
  postCardLayout?: PostCardLayout;
}
export interface PostsLayout {
  sections?: Array<PostsLayoutSection>;
}

export interface PostPageLayout {
  shoppingMethod?: PostLayoutShoppingMethod;
  postsSectionsBelowIds?: Array<string>;
}

export type PostCardLayoutImages =
  | "static"
  | "hoverZoom"
  | "slider"
  | "switch"
  | "rounded";

export type PostCardSize = "small" | "medium" | "long";
export type PostCardLayoutName = "none" | "basic";
export type PostCardLayoutPrice =
  | "none"
  | "basic"
  | "smallerCurrency"
  | "usdCurrencySymbol";
export type PostCardLayoutDiscount = "none" | "savedPercent" | "savedMoney";
export type PostLayoutShoppingMethod =
  | "none"
  | "whatsApp_xsLink_lgQR"
  | "shoppingCart";

export type PostLayoutShoppingCart = "none" | "added_whatsApp";

export type PostCardLayoutMetaLayout = "basic" | "verticalCentered";

export interface PostCardLayout {
  images?: PostCardLayoutImages;
  size?: PostCardSize;
  metaLayout?: PostCardLayoutMetaLayout;
  name?: PostCardLayoutName;
  price?: PostCardLayoutPrice;
  discount?: PostCardLayoutDiscount;
  shoppingMethod?: PostLayoutShoppingMethod;
}

export interface BannerLayout {
  type: BannerLayoutType;
}

export interface SearchLayout {
  type: SearchLayoutType;
}

export interface FooterLayout {
  type: FooterLayoutType;
}

export interface BusinessLayouts {
  posts?: PostsLayout;
  footer?: FooterLayout;
  banner?: BannerLayout;
}

export interface PostCategory {
  label: string;
  tag: string;
  hidden?: boolean;
}

export interface BusinessAboutUsPage {
  visible?: boolean;
  title?: string;
  description?: string; // checkeditor text
}

export type BusinessShoppingStrategy =
  | "whatsAppWithOwner_pickUpProduct"
  | "addToCart_whatsAppWithOwner_pickUpProduct";

export interface Business extends BaseIdentity {
  name: string;
  routeName: string;
  category: BusinessCategory;
  createdBy: mongose.Types.ObjectId; // userId
  hidden?: boolean;
  bannerImages?: Array<Image>;
  logo?: Image;
  postCategories?: Array<PostCategory>;
  socialLinks: {
    face?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  layouts?: BusinessLayouts;
  aboutUsPage?: BusinessAboutUsPage;
  whatsAppPhoneNumber?: string;
  shoppingStrategy?: BusinessShoppingStrategy;
  shoppingMeta?: {
    purchaseRequestTopInfo?: string;
  };
  postFormFields?: Array<
    Extract<
      Post,
      | "name"
      | "currency"
      | "clothingSizes"
      | "colors"
      | "description"
      | "price"
      | "details"
      | "postCategoriesTags"
      | "discount"
      | "postPageLayout"
      | "stockAmount"
      | "images"
    >
  >;
}
