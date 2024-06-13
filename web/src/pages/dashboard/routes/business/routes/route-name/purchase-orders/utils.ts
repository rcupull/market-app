import { ShoppingState } from 'types/shopping';

export const allStatesQuery: Array<ShoppingState> = [
  'REQUESTED',
  'PROCESSING',
  'CANCELED',
  'REJECTED',
  'INVOICED',
  'DELIVERED',
  'READY_TO_DELIVER',
  /**
   * ignored in this view
   */
  // 'CONSTRUCTION',
];
