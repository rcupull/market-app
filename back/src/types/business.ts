import { Address, BaseIdentity, Image, TelegramBotChat } from './general';
import { Schema } from 'mongoose';
import { Post, PostType } from './post';
import { User } from './user';

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

export interface PostsLayoutSection {
  _id: string;
  name: string;
  //
  showMobile?: boolean;
  showPC?: boolean;
  //
  postType: PostType;
  //
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

export type PostCardLayoutImages = 'static' | 'hoverZoom' | 'slider' | 'switch' | 'rounded';

export type PostCardSize = 'small' | 'medium' | 'long';
export type PostCardLayoutName = 'none' | 'basic';
export type PostCardLayoutPrice = 'none' | 'basic' | 'smallerCurrency' | 'usdCurrencySymbol';
export type PostCardLayoutDiscount = 'none' | 'savedPercent' | 'savedMoney';
export type PostLayoutShoppingMethod = 'none' | 'shoppingCart';

export type PostLayoutShoppingCart = 'none' | 'added_whatsApp';

export type PostCardLayoutMetaLayout = 'basic' | 'verticalCentered';

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

export interface BusinessSEO {
  title?: string;
  description?: string;
}

export interface BusinessPaymentRequest {
  shoppingId: string;
  shoppingDebit: number;
}

export interface BusinessPaymentRequestHistory {
  requests: BusinessPaymentRequest;
  paymendDate: Date;
}

export enum BusinessNotificationFlags {
  TELEGRAM_NEW_SHOPPING = 'TELEGRAM_NEW_SHOPPING'
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
  createdBy: Schema.Types.ObjectId; // userId
  hidden?: boolean;
  bannerImages?: Array<Image>;
  logo?: Image;
  postCategories: Array<PostCategory>;
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
  telegramBotChat?: TelegramBotChat;
  notificationFlags?: Array<BusinessNotificationFlags>;
  shoppingMeta?: {
    termsAndConditions?: string;
  };
  postFormFields?: Array<
    Extract<
      Post,
      | 'name'
      | 'currency'
      | 'clothingSizes'
      | 'colors'
      | 'description'
      | 'price'
      | 'details'
      | 'postCategoriesTags'
      | 'discount'
      | 'stockAmount'
      | 'images'
    >
  >;
  currency: BusinessCurrency;
  seo?: BusinessSEO;
  addresses?: Array<Address>;
  deliveryConfig?: DeliveryConfig;
  favoritesUserIds?: Array<Schema.Types.ObjectId>;

  checks?: BusinessChecks;
}

export interface BusinessAdminDto extends Business {
  userData?: Pick<User, 'name'>;
  postCount?: number;
}
export interface BusinessDto extends Business {
  shoppingDebit: number;
}

export interface BusinessSummary extends Pick<Business, '_id' | 'name' | 'routeName'> {
  images: Array<Image>;
  bestDiscount: number; // percent
  salesAmount: number; // ammount
}

export interface BusinessSearchDtoBusiness {
  type: 'business';
  data: Business;
}

export interface BusinessSearchDtoPost {
  type: 'post';
  data: Post;
}

export type BusinessSearchDto = BusinessSearchDtoBusiness | BusinessSearchDtoPost;
