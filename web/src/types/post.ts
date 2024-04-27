import { PostPageLayout } from './business';
import { BaseIdentity, Image, ImageFile } from './general';

export type PostCurrency = 'CUP' | 'USD' | 'MLC';

export type PostReviews = [number, number, number, number, number];

export interface Post extends BaseIdentity {
  createdBy: string;
  images?: Array<Image>;
  routeName: string;
  description: string;
  name: string;
  price: number;
  currency: PostCurrency;
  reviews?: PostReviews;
  colors?: Array<PostColor>;
  highlights?: Array<string>;
  details?: string;
  hidden?: boolean;
  postCategoriesTags?: Array<string>;
  discount?: number; //money to save in the same currency (not percent)
  stockAmount?: number | null; // number of elements in stock. When is undefined or null the user has not enabled this feature
  // clothing
  clothingSizes?: Array<PostClothingSize>;
  //
  postPageLayout?: PostPageLayout;
}

export type PostColor = 'white' | 'gray' | 'black';

export type PostColorMeta = Record<
  PostColor,
  {
    name: PostColor;
    bgColor: string;
    selectedRingColor: string;
  }
>;
// ////////////////CLOTHING

export type PostClothingSize = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';

export type PostFormState = Pick<
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
  | 'postPageLayout'
  | 'stockAmount'
> & { images: Array<ImageFile | Image> };

export type PostFormField = keyof PostFormState;
