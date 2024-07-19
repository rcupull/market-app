import { Access } from './admin';
import { Business, TelegramBotChat } from './business';
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
  checks?: UserChecks;
}

export interface UserDto extends User {
  favoritesBusiness?: Array<Pick<Business, 'routeName' | 'name'>>;
}

export type UserData = User | null;

export interface AuthData {
  user: UserDto;
}

export interface AuthDataDto extends AuthData {
  accessToken: string;
  refreshToken: string;
}
