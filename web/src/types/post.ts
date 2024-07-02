import { PostPageLayout } from './business';
import { BaseIdentity, Image, ImageFile } from './general';

export type PostType = 'product' | 'link'; // el tipo de publicaciones que posee

export type PostReviews = [number, number, number, number, number];

export type PostLinkType = 'business' | 'external';
export interface PostLink {
  type: PostLinkType;
  value: string;
}
export interface Post extends BaseIdentity {
  createdBy: string;
  images?: Array<Image>;
  routeName: string;
  description?: string;
  name: string;
  price?: number;
  reviews?: PostReviews;
  colors?: Array<PostColor>;
  highlights?: Array<string>;
  details?: string;
  hidden?: boolean;
  postCategoriesTags?: Array<string>;
  discount?: number; //money to save in the same currency (not percent)
  stockAmount?: number | null; // number of elements in stock. When is undefined or null the user has not enabled this feature
  stockAmountAvailable?: number; // number of elements in stock available for purchase. When is undefined or null the user has not enabled this feature
  amountInProcess?: number; // number of elements in stock available for purchase. When is undefined or null the user has not enabled this feature
  // clothing
  clothingSizes?: Array<PostClothingSize>;
  //
  postPageLayout?: PostPageLayout;

  postType: PostType;

  postLink?: PostLink;
}

export interface PostPurshaseNotes {
  interestedByColors?: Array<PostColor>;
  interestedByClothingSizes?: Array<PostClothingSize>;
}

export type PostColor =
  | 'white'
  | 'gray'
  | 'black'
  | 'blue'
  | 'red'
  | 'green'
  | 'purple'
  | 'orange'
  | 'yellow'
  | 'slate'
  | 'pink'
  | 'fuchsia'
  | 'violet'
  | 'cyan'
  | 'teal';

export interface PostColorValue {
  name: PostColor;
  bgColor: string;
  selectedRingColor: string;
}
export type PostColorMeta = Record<PostColor, PostColorValue>;
// ////////////////CLOTHING

export type PostClothingSize = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';

export type PostFormState = Pick<
  Post,
  | 'name'
  | 'clothingSizes'
  | 'colors'
  | 'description'
  | 'price'
  | 'details'
  | 'postCategoriesTags'
  | 'discount'
  | 'postPageLayout'
  | 'stockAmount'
  | 'postLink'
> & { images: Array<ImageFile | Image> };

export type PostFormField = keyof PostFormState;
