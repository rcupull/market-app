import { BaseIdentity, Image } from './general';

export type UserRole = 'user' | 'admin';

export interface User extends BaseIdentity {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  validated: boolean;
  profileImage?: Image;
  canCreateBusiness: boolean;
}

export type UserData = User | null;

export interface AuthData {
  user: User;
  token: string;
}
