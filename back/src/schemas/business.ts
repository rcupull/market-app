import { PaginateModel, Schema, model } from 'mongoose';
import { Business } from '../types/business';
import mongoosePaginate from 'mongoose-paginate-v2';
import { createdAtSchemaDefinition } from '../utils/schemas';
import { PostModel } from './post';
import { PostLayoutSchema } from './common';

const BusinessSchema = new Schema<Business>({
  ...createdAtSchemaDefinition,
  name: { type: String, required: true },
  routeName: { type: String, required: true },
  hidden: { type: Boolean, default: false },
  categories: { type: [String], required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  postCategories: {
    type: [
      {
        label: { type: String, required: true },
        tag: { type: String, required: true },
        hidden: { type: Boolean, default: false },
      },
    ],
  },
  bannerImages: {
    type: [
      {
        src: { type: String, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
        href: { type: String },
      },
    ],
    default: [],
  },
  logo: {
    type: {
      src: { type: String, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    default: null,
  },
  socialLinks: {
    face: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    youtube: { type: String },
  },
  layouts: {
    banner: {
      type: {
        type: String,
        enum: ['none', 'static', 'swipableClassic'],
        default: 'static',
      },
    },
    posts: {
      type: PostLayoutSchema,
    },
    footer: {
      type: {
        type: String,
        enum: ['none', 'basic'],
        default: 'basic',
      },
    },
    search: {
      type: {
        type: String,
        enum: [
          'none',
          'left',
          'center',
          'right',
          'postCategories',
          'postCategoriesExcluded',
          'postCategoriesScrollable',
          'postCategoriesExcludedScrollable',
        ],
        default: 'right',
      },
    },
  },
  aboutUsPage: {
    visible: { type: Boolean, default: false },
    title: { type: String },
    description: { type: String },
  },
  whatsAppPhoneNumber: { type: String },
  telegramBotChat: {
    chatId: { type: String },
    firstName: { type: String },
    userName: { type: String },
    type: { type: String, enum: ['private'] },
  },
  shoppingMeta: {
    purchaseRequestTopInfo: { type: String },
  },
  shoppingPayment: {
    initialCredit: { type: Number, default: 500 },
    credit: { type: Number, default: 500 },
    requests: {
      type: [
        {
          _id: false,
          shoppingId: { type: Schema.Types.ObjectId, ref: 'Shopping' },
          fromCredit: { type: Number },
          toPay: { type: Number },
        },
      ],
      default: [],
    },
    history: {
      type: [
        {
          _id: false,
          credit: { type: Number },
          initialCredit: { type: Number },
          shoppingId: { type: Schema.Types.ObjectId, ref: 'Shopping' },
          fromCredit: { type: Number },
          toPay: { type: Number },
        },
      ],
      default: [],
    },
  },
  postFormFields: {
    type: [
      {
        type: String,
        enum: [
          'name',
          'currency',
          'clothingSizes',
          'colors',
          'description',
          'price',
          'details',
          'postCategoriesTags',
          'discount',
          'postPageLayout',
          'stockAmount',
          'images',
        ],
      },
    ],
    default: [
      'name',
      'currency',
      'clothingSizes',
      'colors',
      'description',
      'price',
      'details',
      'postCategoriesTags',
      'discount',
      'postPageLayout',
      'stockAmount',
      'images',
    ],
  },
});

BusinessSchema.plugin(mongoosePaginate);

BusinessSchema.pre('updateOne', async function (next) {
  //@ts-expect-error ignored
  const { hidden } = this.getUpdate();
  const { routeName } = this.getQuery();

  if (hidden !== undefined) {
    await PostModel.updateMany(
      {
        routeName,
      },
      {
        hiddenBusiness: hidden,
      },
    );
  }

  next();
});

export const BusinessModel = model<Business, PaginateModel<Business>>(
  'Business',
  BusinessSchema,
  'business',
);
