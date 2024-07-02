import { Access } from './admin';
import { Address, BaseIdentity, Image, TelegramBotChat } from './general';

export type UserRole = 'user' | 'admin';

export interface User extends BaseIdentity {
  name: string;
  email: string;
  password: string;
  passwordVerbose: string; // remove after migration
  role: UserRole;
  validated: boolean;
  canCreateBusiness: boolean;
  profileImage?: Image;
  firebaseToken?: string;
  specialAccess?: Array<Access>;
  telegramBotChat?: TelegramBotChat;
  phone?: string;
  address?: Address;
}
