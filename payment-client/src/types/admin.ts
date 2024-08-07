import { BaseIdentity } from './general';

export interface AdminConfigFeature {
  key: string;
  enabled: boolean;
  description: string;
}

export interface AdminConfig extends BaseIdentity {
  termsAndConditions?: string;
  privacyPolicy?: string;
  price?: string;
  features?: Array<AdminConfigFeature>;
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
  | 'business__read'
  | 'business__write'
  | 'business__remove'
  //
  | 'bills__read'
  | 'bills__write'
  | 'bills__remove'
  //
  | 'agenda__full'
  | 'upload__native_compilation';
