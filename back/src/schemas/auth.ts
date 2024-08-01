import { Schema, model } from 'mongoose';
import { AuthSession, TYPE_DEVICE, ValidationCode } from '../types/auth';
import { createdAtSchemaDefinition } from '../utils/schemas';

const ValidationCodeShema = new Schema<ValidationCode>({
  ...createdAtSchemaDefinition,
  code: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  meta: { type: Schema.Types.Mixed },
});

export const ValidationCodeModel = model<ValidationCode>(
  'ValidationCode',
  ValidationCodeShema,
  'validation_codes',
);

///////////////////////////////////////////////////////////////////////////////

const AuthSessionShema = new Schema<AuthSession>({
  ...createdAtSchemaDefinition,
  refreshToken: { type: String, required: true },
  typeDevice: { type: String, enum: Object.values(TYPE_DEVICE), required: true },
  descriptionDevice: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const AuthSessionModel = model<AuthSession>(
  'AuthSession',
  AuthSessionShema,
  'auth_sessions',
);
