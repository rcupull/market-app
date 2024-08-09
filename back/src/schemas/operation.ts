import { PaginateModel, Schema, model } from 'mongoose';
import { createdAtSchemaDefinition } from '../utils/schemas';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Operation, OperationType } from '../types/operation';

const OperationSchema = new Schema<Operation>({
  ...createdAtSchemaDefinition,
  type: { type: String, enum: Object.values(OperationType), required: true }
});

OperationSchema.plugin(mongoosePaginate);

export const OperationModel = model<Operation, PaginateModel<Operation>>(
  'Operation',
  OperationSchema,
  'operation'
);
