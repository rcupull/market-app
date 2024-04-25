import { SchemaDefinition } from "mongoose";

export const createdAtSchemaDefinition: SchemaDefinition = {
  createdAt: { type: Date, required: true, default: new Date() },
};
