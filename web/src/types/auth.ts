import { BaseIdentity, Image } from './general';
import { PaymentPlanStatus, PaymentPlanType } from './payment';

export type UserRole = 'user' | 'admin';

export interface UserPurchasedPlan extends BaseIdentity {
  planType: PaymentPlanType;
  dateOfPurchase: string;
  trialMode: boolean;
  status: PaymentPlanStatus;
  validationPurchaseCode?: string;
}

export interface User extends BaseIdentity {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  validated: boolean;
  profileImage?: Image;
  canCreateBusiness: boolean;
  payment: {
    planHistory: Array<UserPurchasedPlan>;
  };
}

export type UserData = User | null;

export interface AuthData {
  user: User;
  token: string;
}
