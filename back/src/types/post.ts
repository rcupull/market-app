import { Schema } from 'mongoose';
import { BaseIdentity, Image } from './general';

export type PostType = 'product' | 'link'; // el tipo de publicaciones que posee

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

export const allSortedColor: Array<PostColor> = [
  'white',
  'gray',
  'black',
  'blue',
  'red',
  'green',
  'purple',
  'orange',
  'yellow',
  'slate',
  'pink',
  'fuchsia',
  'violet',
  'cyan',
  'teal'
];

export type PostClothingSize = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';

export const allSortedClothingSize: Array<PostClothingSize> = [
  'XXS',
  'XS',
  'S',
  'M',
  'L',
  'XL',
  '2XL',
  '3XL'
];

export interface PostPurshaseNotes {
  interestedByColors?: Array<PostColor>;
  interestedByClothingSizes?: Array<PostClothingSize>;
}

export type PostLinkType = 'business' | 'external';

export interface Post extends BaseIdentity {
  images?: Array<Image>;
  routeName: string; // routeName from business
  createdBy: Schema.Types.ObjectId;
  description?: string;
  details?: string;
  name: string;
  price?: number;
  discount?: number;
  colors?: Array<PostColor>;
  highlights?: Array<string>;
  hidden?: boolean;
  hiddenBusiness?: boolean;
  postCategoriesTags?: Array<string>;
  stockAmount?: number;
  // clothing
  clothingSizes?: Array<PostClothingSize>;
  postType?: PostType;

  /**
   * the link when the postType === "link"
   */
  postLink?: {
    type: PostLinkType;
    value: string;
  };
}

export interface PostDto extends Post {
  stockAmountAvailable: number | null;
  amountInProcess: number | null;
}
