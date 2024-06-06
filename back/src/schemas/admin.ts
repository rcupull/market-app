import { Schema, model } from 'mongoose';
import { AuthSession, ValidationCode } from '../types/auth';
import { createdAtSchemaDefinition } from '../utils/schemas';
import { AdminConfig } from '../types/admin';

///////////////////////////////////////////////////////////////////////////////

const AdmiinConfigShema = new Schema<AdminConfig>({
  ...createdAtSchemaDefinition,
  termsAndConditions: { type: String },
});

export const AdminConfigModel = model<AdminConfig>(
  'AdminConfig',
  AdmiinConfigShema,
  'admin_config',
);
