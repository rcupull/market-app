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
          'text-gray-500': !disableColor && state === 'INVOICED',
          'text-yellow-500': !disableColor && state === 'REQUESTED',
          'text-indigo-500': !disableColor && state === 'PROCESSING',
          'text-cyan-500': !disableColor && state === 'READY_TO_DELIVER',
          'text-green-500': !disableColor && state === 'DELIVERED',
          'text-gray-300': !disableColor && state === 'CONSTRUCTION',
          'text-red-500':
            (!disableColor && state === 'REJECTED') || (!disableColor && state === 'CANCELED'),
        },
        className,
      )}
    >
      {getShoppingStateLabel(state)}
    </span>
  );
};
