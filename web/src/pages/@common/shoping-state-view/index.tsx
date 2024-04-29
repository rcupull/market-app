import { Shopping } from 'types/shopping';
import { getShoppingStateLabel } from 'utils/shopping';

export interface ShoppingStateViewProps {
  shopping: Shopping;
}
export const ShoppingStateView = ({ shopping }: ShoppingStateViewProps) => {
  const { state } = shopping;

  return <>{getShoppingStateLabel(state)}</>;
};
