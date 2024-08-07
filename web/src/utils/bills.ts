import { BillState } from 'types/billing';

export const getBillStateLabel = (state: BillState): string => {
  const labels: Record<BillState, string> = {
    CANCELED: 'Cancelada',
    PAID: 'Pagada',
    PENDING_TO_PAY: 'Pendiente'
  };

  return labels[state];
};
