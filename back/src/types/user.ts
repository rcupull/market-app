import { Access } from './admin';
import { Address, BaseIdentity, Image, TelegramBotChat } from './general';

export type UserRole = 'user' | 'admin';

export interface UserChecks {
  requestUserTypeWhenStart?: boolean;
}

export interface User extends BaseIdentity {
  name: string;
  email: string;
  password: string;
  passwordVerbose: string; // remove after migration
  role: UserRole;
  validated: boolean;
  canCreateBusiness?: boolean;
  canMakeDeliveries?: boolean;
  profileImage?: Image;
  firebaseToken?: string;
  specialAccess?: Array<Access>;
  telegramBotChat?: TelegramBotChat;
  phone?: string;
  addresses?: Array<Address>;
  favoritesBusinessRouteNames?: Array<string>;
  checks?: UserChecks;
}

export interface UserDto extends User {
  favoritesBusinessNames?: Array<string>;
}
