import { Divider } from 'components/divider';

import { DeliveryDetails } from './DeliveryDetails';

import { Business } from 'types/business';
import { Shopping } from 'types/shopping';
import { getDateString } from 'utils/date';
import { cn } from 'utils/general';
import { getShoppingData } from 'utils/shopping';

export interface ShoppingDetailsProps {
  rowData: Shopping;
  business: Business | null;
}
export const ShoppingDetails = ({ rowData, business }: ShoppingDetailsProps) => {
  const { createdAt } = rowData;
  const { currency } = business || {};
  const { totalPrice, totalProducts } = getShoppingData(rowData);

  const renderKey = (label: string, options?: { error?: boolean }) => {
    const { error } = options || {};
    return (
      <div
        className={cn('font-bold text-xs text-gray-400', {
          'text-red-500': error,
        })}
      >
        {label}
      </div>
    );
  };

  const renderValue = (value: React.ReactNode, options?: { error?: boolean }) => {
    const { error } = options || {};

    return (
      <div
        className={cn('font-semibold', {
          'text-red-500': error,
        })}
      >
        {value}
      </div>
    );
  };

  return (
    <div className="w-48 sm:w-60">
      <DeliveryDetails rowData={rowData} business={business} />

      {renderKey('Fecha')}
      {renderValue(getDateString({ date: createdAt, showTime: true }))}

      <Divider className="!my-1" />

      {renderKey('Precio')}
      {renderValue(`${totalPrice} ${currency}`)}

      <Divider className="!my-1" />

      {renderKey('Total de productos')}
      {renderValue(totalProducts)}

      <Divider className="!my-1" />
    </div>
  );
};
