import { PaginateModel, Schema, model } from 'mongoose';
import { Business, BusinessNotificationFlags } from '../types/business';
import mongoosePaginate from 'mongoose-paginate-v2';
import { createdAtSchemaDefinition } from '../utils/schemas';
import { PostModel } from './post';
import {
  AddressDefinition,
  DeliveryConfigDefinition,
  PostLayoutSchema,
  TelegramBotChatDefinition
} from './common';

const BusinessSchema = new Schema<Business>({
  ...createdAtSchemaDefinition,
  name: { type: String, required: true },
  routeName: { type: String, required: true },
  hidden: { type: Boolean, default: false },
  currency: { type: String, enum: ['CUP', 'MLC', 'USD'], required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  postCategories: {
    type: [
      {
        label: { type: String, required: true },
        tag: { type: String, required: true },
        hidden: { type: Boolean, default: false }
      }
    ],
    required: true
  },
  bannerImages: {
    type: [
      {
        src: { type: String, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
        href: { type: String }
      }
    ],
    default: []
  },
  logo: {
    type: {
      src: { type: String, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true }
    },
    default: null
  },
  socialLinks: {
    face: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    youtube: { type: String }
  },
  layouts: {
    banner: {
      type: {
        type: String,
        enum: ['none', 'static', 'swipableClassic'],
        default: 'none'
      }
    },
    posts: {
      type: PostLayoutSchema
    },
    footer: {
      type: {
        type: String,
        enum: ['none', 'basic'],
        default: 'basic'
      }
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
          'postCategoriesExcludedScrollable'
        ],
        default: 'right'
      }
    }
  },
  aboutUsPage: {
    visible: { type: Boolean, default: false },
    title: { type: String },
    description: { type: String }
  },
  whatsAppPhoneNumber: { type: String },
  telegramBotChat: TelegramBotChatDefinition,
  notificationFlags: {
    type: [
      {
        type: String,
        enum: Object.values(BusinessNotificationFlags)
      }
    ],
    default: [BusinessNotificationFlags.TELEGRAM_NEW_SHOPPING]
  },
  shoppingMeta: {
    termsAndConditions: { type: String }
  },
  postFormFields: {
    type: [
      {
        type: String,
        enum: [
          'name',
          'clothingSizes',
          'colors',
          'description',
          'price',
          'details',
          'postCategoriesTags',
          'discount',
          'stockAmount',
          'images'
        ]
      }
    ],
    default: [
      'name',
      'clothingSizes',
      'colors',
      'description',
      'price',
      'details',
      'postCategoriesTags',
      'discount',
      'stockAmount',
      'images'
    ]
  },
  seo: {
    title: { type: String },
    description: { type: String }
  },
  addresses: [AddressDefinition],
  deliveryConfig: DeliveryConfigDefinition,
  favoritesUserIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  checks: { type: Schema.Types.Mixed }
});

BusinessSchema.plugin(mongoosePaginate);

BusinessSchema.pre('updateOne', async function (next) {
  //@ts-expect-error ignored
  const { hidden } = this.getUpdate();
  const { routeName } = this.getQuery();

  if (hidden !== undefined) {
    await PostModel.updateMany(
      {
        routeName
      },
      {
        hiddenBusiness: hidden
      }
    );
  }

  next();
});

export const BusinessModel = model<Business, PaginateModel<Business>>(
  'Business',
  BusinessSchema,
  'business'
);
