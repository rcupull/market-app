import { Shopping, ShoppingState } from 'types/shopping';

const labels: Record<ShoppingState, string> = {
  CONSTRUCTION: 'En construcción',
  REQUESTED: 'Solicitado',
  DELIVERED: 'Entregado',
  CANCELED: 'Cancelado',
  REJECTED: 'Rechazado',
};

export interface ShoppingStateViewProps {
  shopping: Shopping;
}
export const ShoppingStateView = ({ shopping }: ShoppingStateViewProps) => {
  const { state } = shopping;

  return <>{labels[state]}</>;
};
