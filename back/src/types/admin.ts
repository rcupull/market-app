import { BaseIdentity } from './general';

export interface AdminConfig extends BaseIdentity {
  termsAndConditions?: string;
  privacyPolicy?: string;
}

export type Access = 'access__read' | 'user_access__write' | 'user__remove';
