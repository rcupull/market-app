import { BaseIdentity, Image } from './general';
import { PostFormState } from './post';

export type BusinessCategory = 'food' | 'tool' | 'clothing' | 'service';

export type PostsLayoutSectionType = 'grid' | 'oneRowSlider';
export type PostsLayoutSectionVisibility = 'businessPage' | 'postPage';
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
  showIn?: Array<PostsLayoutSectionVisibility>;
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
export type PostLayoutShoppingMethod = 'none' | 'whatsApp_xsLink_lgQR' | 'shoppingCart';

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

export interface PostPageLayout {
  shoppingMethod?: PostLayoutShoppingMethod;
  postsSectionsBelowIds?: Array<string>;
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

export interface Business extends BaseIdentity {
  name: string;
  category: BusinessCategory;
  routeName: string;
  createdBy: string; // userId
  hidden?: boolean;
  bannerImages?: Array<Image>;
  logo?: Image;
  postCategories?: Array<PostCategory>;
  socialLinks?: SocialLinks;
  layouts?: BusinessLayouts;
  aboutUsPage?: BusinessAboutUsPage;
  whatsAppPhoneNumber?: string;
  shoppingStrategy?: BusinessShoppingStrategy;
  shoppingMeta?: {
    purchaseRequestTopInfo?: string;
  };
  postFormFields?: Array<keyof PostFormState>;
}
