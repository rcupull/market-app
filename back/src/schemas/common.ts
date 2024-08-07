import { Schema, SchemaDefinitionProperty } from 'mongoose';
import {
  DeliveryConfig,
  DeliveryConfigType,
  PostCardLayout,
  PostLayoutShoppingMethod,
  PostsLayout,
  PostsLayoutSection
} from '../types/business';
import { Address } from '../types/general';

const PostLayoutShoppingMethodDefinition: SchemaDefinitionProperty<PostLayoutShoppingMethod> = {
  type: String,
  enum: ['none', 'shoppingCart']
};

export const DeliveryConfigDefinition: SchemaDefinitionProperty<DeliveryConfig> = {
  type: {
    type: String,
    enum: Object.values(DeliveryConfigType),
    default: DeliveryConfigType.NONE
  },
  minPrice: { type: Number, default: 0 },
  priceByKm: { type: Number, default: 0 }
};

export const AddressDefinition: SchemaDefinitionProperty<Address> = {
  city: { type: String },
  municipality: { type: String },
  street: { type: String },
  streetBetweenFrom: { type: String },
  streetBetweenTo: { type: String },
  neighborhood: { type: String },
  number: { type: Number },
  apartment: { type: Number },
  country: { type: String },
  countryCode: { type: String },
  lat: { type: Number },
  lon: { type: Number },
  postCode: { type: String },
  placeId: { type: String }
};

export const PostCardLayoutSchema = new Schema<PostCardLayout>({
  images: {
    type: String,
    enum: ['static', 'hoverZoom', 'slider', 'switch', 'rounded'],
    default: 'static'
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'long'],
    default: 'medium'
  },
  metaLayout: {
    type: String,
    enum: ['basic', 'verticalCentered'],
    default: 'basic'
  },
  name: {
    type: String,
    enum: ['none', 'basic'],
    required: true,
    default: 'basic'
  },
  price: {
    type: String,
    enum: ['none', 'basic', 'smallerCurrency', 'usdCurrencySymbol'],
    default: 'basic'
  },
  discount: {
    type: String,
    enum: ['none', 'savedPercent', 'savedMoney'],
    default: 'none'
  },
  shoppingMethod: PostLayoutShoppingMethodDefinition
});

export const PostsLayoutSectionSchema = new Schema<PostsLayoutSection>({
  name: { type: String },
  hiddenName: { type: Boolean, default: false },
  showMobile: { type: Boolean, default: false },
  showPC: { type: Boolean, default: false },
  searchLayout: {
    type: String,
    enum: [
      'none',
      'left',
      'center',
      'right',
      'postCategories',
      'postCategoriesScrollable',
      'postCategoriesExcluded',
      'postCategoriesExcludedScrollable'
    ],
    default: 'none'
  },
  postCategoriesTags: { type: [String] },
  type: {
    type: String,
    enum: ['grid', 'oneRowSlider'],
    default: 'grid'
  },
  postCardLayout: {
    type: PostCardLayoutSchema
  },
  postType: {
    type: String,
    enum: ['product', 'link'],
    required: true,
    default: 'product'
  }
});

export const PostLayoutSchema = new Schema<PostsLayout>({
  sections: {
    type: [PostsLayoutSectionSchema],
    default: []
  }
});
