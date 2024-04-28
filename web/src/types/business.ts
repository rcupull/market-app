import { BaseIdentity, Image } from './general';
import { PostFormField } from './post';

export type BusinessCategory = string;

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

export interface BusinessPaymentRequest {
  shoppingId: string;
  fromCredit: number;
  toPay: number;
}

export interface BusinessPaymentRequestHistory extends BusinessPaymentRequest {
  credit: number;
  initialCredit: number;
}

export interface Business extends BaseIdentity {
  name: string;
  categories: Array<BusinessCategory>;
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
  shoppingPayment: {
    //El credito inicial que el sistema le pone al usuario todos los meses. No es acumulable
    initialCredit: number;
    //el credito actual. irá decrementando cada vez que se realice un pedido
    credit: number;
    requests: Array<BusinessPaymentRequest>;
    history: Array<BusinessPaymentRequestHistory>;
  };
  postFormFields?: Array<PostFormField>;
}
