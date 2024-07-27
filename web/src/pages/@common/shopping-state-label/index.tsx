import { StyleProps } from 'types/general';
import { ShoppingState } from 'types/shopping';
import { cn } from 'utils/general';
import { getShoppingStateLabel } from 'utils/shopping';

export interface ShoppingStateLabelProps extends StyleProps {
  state: ShoppingState;
  disableColor?: boolean;
}

export const ShoppingStateLabel = ({ state, disableColor, className }: ShoppingStateLabelProps) => {
  return (
    <span
      className={cn(
        'font-bold',
        {
          'text-yellow-500': !disableColor && state === ShoppingState.REQUESTED,
          'text-indigo-500': !disableColor && state === ShoppingState.PROCESSING,
          'text-gray-500': !disableColor && state === ShoppingState.READY_TO_DELIVERY,
          'text-green-500': !disableColor && state === ShoppingState.DELIVERED,
          'text-gray-300': !disableColor && state === ShoppingState.CONSTRUCTION,
          'text-blue-500': !disableColor && state === ShoppingState.APPROVED,
          'text-red-500':
            (!disableColor && state === ShoppingState.REJECTED) ||
            (!disableColor && state === ShoppingState.CANCELED),
        },
        className,
      )}
    >
      {getShoppingStateLabel(state)}
    </span>
  );
};
