import { ShoppingStateLabel } from '../shopping-state-label';

import { StyleProps } from 'types/general';
import { Shopping } from 'types/shopping';

export interface ShoppingStateBadgeProps extends StyleProps {
  shopping: Shopping;
}

export const ShoppingStateBadge = ({ shopping }: ShoppingStateBadgeProps) => {
  const { state } = shopping;

  return (
    <div className="flex items-center gap-1">
      <span>Estado:</span>
      <ShoppingStateLabel state={state} />
    </div>
  );
};
