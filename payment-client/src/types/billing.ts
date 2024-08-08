import { BaseIdentity } from './general';

export type BillState = 'PENDING_TO_PAY' | 'CANCELED' | 'PAID';

export interface Bill extends BaseIdentity {
  shoppingIds: Array<string>;
  totalDebit: number;
  state: BillState;
  routeName: string;
}
