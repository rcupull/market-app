import SvgTruckSolid from 'icons/TruckSolid';
import { Business, DeliveryConfigType } from 'types/business';
import { StyleProps } from 'types/general';
import { Shopping } from 'types/shopping';
import { cn } from 'utils/general';

export interface DeliveryDetailsProps extends StyleProps {
  rowData: Shopping;
  business: Business | null;
}
export const DeliveryDetails = ({ rowData, className }: DeliveryDetailsProps) => {
  const { delivery } = rowData;
  const { price, distance } = delivery || {};

  const renderDistancePrice = () => {
    if (!delivery) {
      return 'Sin envío';
    }
    const distanceNode = <span>{`${distance} kms`}</span>;

    if (delivery.deliveryType === DeliveryConfigType.FREE) {
      return (
        <>
          {distanceNode}
          -
          (Gratis)
        </>
      );
    }

    return (
      <>
        {distanceNode}
        -
        <span>{`${price} CUP`}</span>
      </>
    );
  };

  return (
    <div className={cn('flex items-center gap-2 font-semibold', className)}>
      <SvgTruckSolid
        className={cn('size-7', {
          'fill-green-500': delivery,
          'fill-red-500': !delivery,
        })}
      />
  
      {renderDistancePrice()}
    </div>
  );
};
