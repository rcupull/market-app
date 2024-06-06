import { BaseIdentity } from './general';

export interface AdminConfig extends BaseIdentity {
  termsAndConditions?: string;
}
