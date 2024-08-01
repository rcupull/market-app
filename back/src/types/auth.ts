import { Schema } from 'mongoose';
import { AnyRecord, BaseIdentity } from './general';

export enum TYPE_DEVICE {
  NATIVE = 'NATIVE',
  WEB = 'WEB',
}

export interface AuthSession extends BaseIdentity {
  refreshToken: string;
  typeDevice: TYPE_DEVICE;
  descriptionDevice: string;
  userId: Schema.Types.ObjectId;
}

export interface ValidationCode extends BaseIdentity {
  code: string;
  userId?: Schema.Types.ObjectId;
  meta?: AnyRecord;
}
