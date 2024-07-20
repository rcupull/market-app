import { Divider } from 'components/divider';

import { ListDetailsKey } from 'pages/@common/list-details-key';
import { ListDetailsValue } from 'pages/@common/list-details-value';
import { PostAmount } from 'pages/@common/post-amount';
import { Business } from 'types/business';
import { Post } from 'types/post';
import { isNullOrUndefined, isNumber } from 'utils/general';

export interface ProductDetailsProps {
  rowData: Post;
  business: Business | null;
  onRefresh: () => void;
}
export const ProductDetails = ({ rowData, business, onRefresh }: ProductDetailsProps) => {
  const { price, stockAmount, _id: postId, stockAmountAvailable, amountInProcess } = rowData;

  const renderUnit = (value: number | undefined) => {
    if (isNullOrUndefined(value)) return '';

    return `${value} ${value === 1 ? 'unidad' : 'unidades'}`;
  };

  return (
    <div className="w-32">
      <ListDetailsKey label="Precio" />
      <ListDetailsValue value={`${price} ${business?.currency}`} />

      <Divider narrow />

      <ListDetailsKey label="En proceso de venta" />
      <ListDetailsValue value={renderUnit(amountInProcess)} />

      <Divider narrow />

      {isNumber(stockAmount) ? (
        <>
          <ListDetailsKey label="Total de unidades" />
          <ListDetailsValue
            value={
              <PostAmount
                value={stockAmount}
                postId={postId}
                onAfterSuccess={onRefresh}
                error={stockAmount === 0}
                min={amountInProcess}
              />
            }
          />

          <Divider narrow />

          <ListDetailsKey label="Disponibles" error={stockAmountAvailable === 0} />
          <ListDetailsValue
            value={renderUnit(stockAmountAvailable)}
            error={stockAmountAvailable === 0}
          />
        </>
      ) : (
        <>
          <ListDetailsKey label="Existencias" />
          <ListDetailsValue value="Desabilitado" error />
        </>
      )}
    </div>
  );
};
