import { Access } from './admin';
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
}

export type UserData = User | null;

export interface AuthData {
  user: User;
  accessToken: string;
  refreshToken: string;
}
