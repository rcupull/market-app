import { PaginateModel, Schema, model } from 'mongoose';
import { createdAtSchemaDefinition } from '../utils/schemas';
import { Bill } from '../types/billing';
import mongoosePaginate from 'mongoose-paginate-v2';

const BillSchema = new Schema<Bill>({
  ...createdAtSchemaDefinition,
  shoppingIds: { type: [Schema.Types.ObjectId], required: true },
  state: { type: String, enum: ['PENDING_TO_PAY', 'CHECKING_PAY', 'PAID'], required: true },
  totalDebit: { type: Number, required: true },
  routeName: { type: String, required: true }
});

BillSchema.plugin(mongoosePaginate);

export const BillingModel = model<Bill, PaginateModel<Bill>>('Bill', BillSchema, 'billing');
