import { Address, BaseIdentity, Image } from './general';
import { PostType, ProductFormField } from './post';

export type BusinessCategory = string;
export type BusinessCurrency = 'CUP' | 'MLC' | 'USD';

export type PostsLayoutSectionType = 'grid' | 'oneRowSlider';
export type BannerLayoutType = 'none' | 'static' | 'swipableClassic';
export type SearchLayoutType =
  | 'none'
  | 'left'
  | 'center'
  | 'right'
  | 'postCategories'
  | 'postCategoriesScrollable'
  | 'postCategoriesExcluded'
  | 'postCategoriesExcludedScrollable';

export type FooterLayoutType = 'none' | 'basic';

export type PostSectionType = 'post' | 'link';

export interface PostsLayoutSection {
  _id: string;
  //
  showMobile?: boolean;
  showPC?: boolean;
  //
  postType: PostType;
  //
  name: string;
  hiddenName?: boolean;
  //
  searchLayout?: SearchLayoutType;
  //
  postCategoriesTags?: Array<string>;
  //
  type: PostsLayoutSectionType;
  //
  postCardLayout?: PostCardLayout;
  //
}
export interface PostsLayout {
  sections: Array<PostsLayoutSection>;
}

export type PostCardLayoutImages = 'static' | 'hoverZoom' | 'slider' | 'switch' | 'rounded';
export type PostCardSize = 'small' | 'medium' | 'long';
export type PostCardLayoutName = 'none' | 'basic';
export type PostCardLayoutPrice = 'none' | 'basic' | 'smallerCurrency' | 'usdCurrencySymbol';
export type PostCardLayoutDiscount = 'none' | 'savedPercent' | 'savedMoney';
export type PostCardLayoutMetaLayout = 'basic' | 'verticalCentered';
export type PostLayoutShoppingMethod = 'none' | 'shoppingCart';

export interface PostCardLayout {
  images?: PostCardLayoutImages;
  //
  /**
   * indica la forma en que se representan los metadatos de la tarjeta
   */
  metaLayout?: PostCardLayoutMetaLayout;
  //
  size?: PostCardSize;
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

export interface SocialLinks {
  face?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

export interface BusinessAboutUsPage {
  visible?: boolean;
  title?: string;
  description?: string; // checkeditor text
}

export type BusinessShoppingStrategy =
  | 'none'
  | 'whatsAppWithOwner_pickUpProduct'
  | 'addToCart_whatsAppWithOwner_pickUpProduct';

export interface BusinessPaymentRequest {
  shoppingId: string;
  shoppingDebit: number;
}

export interface BusinessPaymentRequestHistory {
  requests: BusinessPaymentRequest;
  paymendDate: Date;
}

export enum BusinessNotificationFlags {
  NEW_SHOPPING = 'NEW_SHOPPING'
}

export interface BusinessSEO {
  title?: string;
  description?: string;
}

export enum DeliveryConfigType {
  NONE = 'NONE',
  FREE = 'FREE',
  REQUIRED = 'REQUIRED',
  OPTIONAL = 'OPTIONAL'
}

export interface DeliveryConfig {
  minPrice?: number;
  priceByKm?: number;
  type?: DeliveryConfigType;
}

export interface BusinessChecks {
  doneOnboarding?: boolean;
}

export interface Business extends BaseIdentity {
  name: string;
  routeName: string;
  createdBy: string; // userId
  hidden?: boolean;
  bannerImages?: Array<Image>;
  logo?: Image | null;
  postCategories?: Array<PostCategory>;
  socialLinks?: SocialLinks;
  layouts?: BusinessLayouts;
  aboutUsPage?: BusinessAboutUsPage;
  phoneNumber?: string;
  notificationFlags?: Array<BusinessNotificationFlags>;
  shoppingMeta?: {
    termsAndConditions?: string;
  };
  shoppingDebit: number;
  postFormFields?: Array<ProductFormField>;
  currency: BusinessCurrency;
  seo?: BusinessSEO;
  addresses?: Array<Address>;
  deliveryConfig?: DeliveryConfig;
  //
  checks?: BusinessChecks;
}

export interface BusinessSummary extends Pick<Business, '_id' | 'name' | 'routeName'> {
  images: Array<Image>;
  bestDiscount: number;
  salesAmount: number;
}

export type PostsLayoutSectionPayload = Pick<
  PostsLayoutSection,
  | 'name'
  | 'postCardLayout'
  | 'postCategoriesTags'
  | 'searchLayout'
  | 'hiddenName'
  | 'showMobile'
  | 'showPC'
  | 'type'
  | 'postType'
>;
