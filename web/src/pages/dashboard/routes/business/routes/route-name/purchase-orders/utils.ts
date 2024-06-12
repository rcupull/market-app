import { ShoppingState } from 'types/shopping';

export const allStatesQuery: Array<ShoppingState> = [
  'CANCELED',
  'DELIVERED',
  'REJECTED',
  'REQUESTED',
  'IN_PROGRESS',
  'READY_TO_DELIVER',
  /**
   * ignored in this view
   */
  // "CONSTRUCTION",
  // 'PAID',
  // 'INVOICED'
];
