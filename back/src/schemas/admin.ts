import { Schema, model } from 'mongoose';
import { createdAtSchemaDefinition } from '../utils/schemas';
import { AdminConfig } from '../types/admin';

///////////////////////////////////////////////////////////////////////////////

const AdminConfigShema = new Schema<AdminConfig>({
  ...createdAtSchemaDefinition,
  termsAndConditions: { type: String },
  privacyPolicy: { type: String },
  price: { type: String },
  features: {
    type: [
      {
        _id: false,
        key: { type: String, unique: true },
        enabled: { type: Boolean },
        description: { type: String }
      }
    ]
  }
});

export const AdminConfigModel = model<AdminConfig>('AdminConfig', AdminConfigShema, 'admin_config');
