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
  password: string;
  passwordVerbose: string; // remove after migration
  role: UserRole;
  validated: boolean;
  canCreateBusiness?: boolean;
  //
  canMakeDeliveries?: boolean;
  deliveryBusiness?: Array<UserDeliveryBusinessData>;
  //
  profileImage?: Image;
  firebaseToken?: string;
  specialAccess?: Array<Access>;
  phone?: string;
  addresses?: Array<Address>;
  checks?: UserChecks;
}

export interface UserDto extends User {
  favoritesBusiness?: Array<Pick<Business, 'routeName' | 'name'>>;
}
