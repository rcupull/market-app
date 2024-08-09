import { BaseIdentity } from './general';

export enum OperationType {
  VALIDATION_ACCOUNT = 'VALIDATION_ACCOUNT'
}

export interface Operation extends BaseIdentity {
  type: OperationType;
}
