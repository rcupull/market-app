import { Schema, SchemaDefinitionProperty } from 'mongoose';
import {
  PostCardLayout,
  PostLayoutShoppingMethod,
  PostPageLayout,
  PostsLayout,
  PostsLayoutSection,
} from '../types/business';
import { TelegramBotChat } from '../types/general';

const PostLayoutShoppingMethodDefinition: SchemaDefinitionProperty<PostLayoutShoppingMethod> = {
  type: String,
  enum: ['none', 'shoppingCart'],
};

export const TelegramBotChatDefinition: SchemaDefinitionProperty<TelegramBotChat> = {
  chatId: { type: String },
  firstName: { type: String },
  userName: { type: String },
};

export const PostCardLayoutSchema = new Schema<PostCardLayout>({
  images: {
    type: String,
    enum: ['static', 'hoverZoom', 'slider', 'switch', 'rounded'],
    default: 'static',
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'long'],
    default: 'medium',
  },
  metaLayout: {
    type: String,
    enum: ['basic', 'verticalCentered'],
    default: 'basic',
  },
  name: {
    type: String,
    enum: ['none', 'basic'],
    required: true,
    default: 'basic',
  },
  price: {
    type: String,
    enum: ['none', 'basic', 'smallerCurrency', 'usdCurrencySymbol'],
    default: 'basic',
  },
  discount: {
    type: String,
    enum: ['none', 'savedPercent', 'savedMoney'],
    default: 'none',
  },
  shoppingMethod: PostLayoutShoppingMethodDefinition,
});

export const PostPageLayoutSchema = new Schema<PostPageLayout>({});

export const PostsLayoutSectionSchema = new Schema<PostsLayoutSection>({
  name: { type: String },
  hiddenName: { type: Boolean, default: false },
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
      'postCategoriesExcludedScrollable',
    ],
    default: 'none',
  },
  postCategoriesTags: { type: [String] },
  showIn: {
    type: [
      {
        type: String,
        enum: ['businessPage', 'postPage'],
      },
    ],
    default: [],
  },
  type: {
    type: String,
    enum: ['grid', 'oneRowSlider'],
    default: 'grid',
  },
  postCardLayout: {
    type: PostCardLayoutSchema,
  },
  postType: {
    type: String,
    enum: ['product', 'link'],
    required: true,
    default: 'product',
  },
});

export const PostLayoutSchema = new Schema<PostsLayout>({
  sections: {
    type: [PostsLayoutSectionSchema],
    default: [],
  },
});
