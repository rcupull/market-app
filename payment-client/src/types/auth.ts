import { Access } from './admin';
import { Business } from './business';
import { Address, BaseIdentity, Image } from './general';

export type UserRole = 'user' | 'admin' | 'paymentClient';

export interface UserChecks {
  requestUserTypeWhenStart?: boolean;
}

interface UserDeliveryBusinessData {
  routeName: string;
  updatedAt: Date;
}

export interface User extends BaseIdentity {
  name: string;
  email: string;
  role: UserRole;
  validated: boolean;
  profileImage?: Image | null;
  canCreateBusiness?: boolean;
  //
  canMakeDeliveries?: boolean;
  deliveryBusiness?: Array<UserDeliveryBusinessData>;
  //
  specialAccess?: Array<Access>;
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

export enum TYPE_DEVICE {
  NATIVE = 'NATIVE',
  WEB = 'WEB'
}
