import { Schema, model } from 'mongoose';
import { createdAtSchemaDefinition } from '../utils/schemas';
import { AdminConfig } from '../types/admin';

///////////////////////////////////////////////////////////////////////////////

const AdminConfigShema = new Schema<AdminConfig>({
  ...createdAtSchemaDefinition,
  termsAndConditions: { type: String },
  privacyPolicy: { type: String },
  price: { type: String },
});

export const AdminConfigModel = model<AdminConfig>('AdminConfig', AdminConfigShema, 'admin_config');
