import { Access } from './admin';
import { TelegramBotChat } from './business';
import { Address, BaseIdentity, Image } from './general';

export type UserRole = 'user' | 'admin';

export interface UserChecks {
  requestUserTypeWhenStart?: boolean;
}
export interface User extends BaseIdentity {
  name: string;
  email: string;
  role: UserRole;
  validated: boolean;
  profileImage?: Image | null;
  canCreateBusiness?: boolean;
  canMakeDeliveries?: boolean;

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

export type UserData = User | null;

export interface AuthData {
  user: UserDto;
}

export interface AuthDataDto extends AuthData {
  accessToken: string;
  refreshToken: string;
}
