import SvgTruckSolid from 'icons/TruckSolid';
import { Business } from 'types/business';
import { StyleProps } from 'types/general';
import { Shopping } from 'types/shopping';
import { cn } from 'utils/general';

export interface DeliveryDetailsProps extends StyleProps {
  rowData: Shopping;
  business: Business | null;
}
export const DeliveryDetails = ({ rowData, className }: DeliveryDetailsProps) => {
  const { deliveryEnabled } = rowData;

  return (
    <div className={className}>
      <SvgTruckSolid
        className={cn('size-7', {
          'fill-green-500': deliveryEnabled,
          'fill-red-500': !deliveryEnabled,
        })}
      />
    </div>
  );
};
