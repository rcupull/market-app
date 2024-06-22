import { Access } from './admin';
import { TelegramBotChat } from './business';
import { BaseIdentity, Image } from './general';

export type UserRole = 'user' | 'admin';

export interface User extends BaseIdentity {
  name: string;
  email: string;
  role: UserRole;
  validated: boolean;
  profileImage?: Image | null;
  canCreateBusiness: boolean;
  specialAccess?: Array<Access>;
  telegramBotChat?: TelegramBotChat;
}

export type UserData = User | null;

export interface AuthData {
  user: User;
}

export interface AuthDataDto extends AuthData {
  accessToken: string;
  refreshToken: string;
}
