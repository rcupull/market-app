import { ShoppingState } from '../types/shopping';

export const getShoppingStateLabel = (state: ShoppingState): string => {
  const labels: Record<ShoppingState, string> = {
    CONSTRUCTION: 'En construcción', //this state is temporaly and can not handle by the user
    REQUESTED: 'Solicitado',
    CANCELED: 'Cancelado',
    REJECTED: 'Rechazado',
    PROCESSING: 'En proceso',
    READY_TO_DELIVERY: 'Listo para entregar',
    DELIVERED: 'Entregado',
    APPROVED: 'Aceptado',
  };

  return labels[state];
};
