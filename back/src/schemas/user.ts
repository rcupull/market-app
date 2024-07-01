import { PaginateModel, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from '../types/user';
import { createdAtSchemaDefinition } from '../utils/schemas';
import mongoosePaginate from 'mongoose-paginate-v2';
import { AddressDefinition, TelegramBotChatDefinition } from './common';

const UserSchema = new Schema<User>({
  ...createdAtSchemaDefinition,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  passwordVerbose: { type: String, required: true, select: false },
  firebaseToken: { type: String, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  canCreateBusiness: { type: Boolean, required: true, default: false },
  validated: { type: Boolean, default: false },
  profileImage: {
    type: {
      _id: false,
      src: { type: String, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    default: null,
  },
  specialAccess: { type: [String], default: [] },
  telegramBotChat: TelegramBotChatDefinition,
  phone: { type: String },
  address: AddressDefinition,
});

const updateUserPassword = (user: User): Promise<void> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return reject(err);

        user.password = hash;
        resolve();
      });
    });
  });
};

UserSchema.plugin(mongoosePaginate);

UserSchema.pre('save', async function (next) {
  //eslint-disable-next-line
  const user = this;

  if (user.isModified('password')) {
    try {
      await updateUserPassword(user);
    } catch (err: any) {
      next(err);
    }
  }

  next();
});

export const UserModel = model<User, PaginateModel<User>>('User', UserSchema, 'users');
