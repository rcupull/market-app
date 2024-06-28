import { BaseIdentity, Image, TelegramBotChat } from './general';
import { Schema } from 'mongoose';
import { Post, PostType } from './post';
import { Path } from './paths';
import { businessCategoryTree } from '../features/general/constants';

export type BusinessCategory = Path<typeof businessCategoryTree>;
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
  showIn?: Array<'businessPage' | 'postPage'>;
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

export interface PostPageLayout {
  postsSectionsBelowIds?: Array<string>;
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

export interface BusinessPaymentRequest {
  shoppingId: string;
  shoppingDebit: number;
}

export interface BusinessPaymentRequestHistory {
  requests: BusinessPaymentRequest;
  paymendDate: Date;
}

export interface Business extends BaseIdentity {
  name: string;
  routeName: string;
  categories: Array<BusinessCategory>;
  createdBy: Schema.Types.ObjectId; // userId
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
  telegramBotChat?: TelegramBotChat;
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
}

export interface BusinessDto extends Business {
  shoppingDebit: number;
}

export interface BusinessSummary extends Pick<Business, '_id' | 'name' | 'routeName'> {
  images: Array<Image>;
  bestDiscount: number; // percent
  salesAmount: number; // ammount
}
