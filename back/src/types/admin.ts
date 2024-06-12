import { BaseIdentity } from './general';

export interface AdminConfig extends BaseIdentity {
  termsAndConditions?: string;
  privacyPolicy?: string;
}

export type Access =
  | 'full'
  //
  | 'access__read'
  | 'user_access__write'
  //
  | 'user__remove'
  | 'user__read'
  | 'user__write'
  //
  | 'shopping__read'
  | 'shopping__write'
  | 'shopping__remove';
