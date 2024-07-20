import { Divider } from 'components/divider';

import { DeliveryDetails } from './DeliveryDetails';

import { ListDetailsKey } from 'pages/@common/list-details-key';
import { ListDetailsValue } from 'pages/@common/list-details-value';
import { Business } from 'types/business';
import { Shopping } from 'types/shopping';
import { getDateString } from 'utils/date';
import { getShoppingData } from 'utils/shopping';

export interface ShoppingDetailsProps {
  rowData: Shopping;
  business: Business | null;
}
export const ShoppingDetails = ({ rowData, business }: ShoppingDetailsProps) => {
  const { createdAt } = rowData;
  const { currency } = business || {};
  const { totalPrice, totalProducts } = getShoppingData(rowData);

  return (
    <div className="w-48 sm:w-60">
      <ListDetailsKey label="Entrega" />
      <ListDetailsValue value={<DeliveryDetails rowData={rowData} business={business} />} />

      <Divider narrow />

      <ListDetailsKey label="Fecha" />
      <ListDetailsValue value={getDateString({ date: createdAt, showTime: true })} />

      <Divider narrow />

      <ListDetailsKey label="Precio de los productos" />
      <ListDetailsValue value={`${totalPrice} ${currency}`} />

      <Divider narrow />

      <ListDetailsKey label="Total de productos" />
      <ListDetailsValue value={totalProducts} />
    </div>
  );
};
