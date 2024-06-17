import { BaseIdentity } from './general';

export interface AdminConfig extends BaseIdentity {
  termsAndConditions?: string;
  privacyPolicy?: string;
  price?: string;
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
  | 'shopping__remove'
  //
  | 'bills__read'
  | 'bills__write'
  | 'bills__remove'
  | 'agenda__full';
