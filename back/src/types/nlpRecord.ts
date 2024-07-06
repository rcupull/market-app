import { BaseIdentity } from './general';

export interface NlpRecord extends BaseIdentity {
  data: Record<string, Array<string>>;
}
