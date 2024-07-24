import { Schema } from 'mongoose';
import { BaseIdentity } from './general';
import { BusinessCurrency } from './business';

export interface Delivery extends BaseIdentity {
  routeName: string;
  shoppingId: Schema.Types.ObjectId;
  deliveryManId: Schema.Types.ObjectId;
  price: number;
  currency: BusinessCurrency;
}
