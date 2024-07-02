import { Divider } from 'components/divider';

import { PostAmount } from 'pages/@common/post-amount';
import { Business } from 'types/business';
import { Post } from 'types/post';
import { cn, isNullOrUndefined, isNumber } from 'utils/general';

export interface ProductDetailsProps {
  rowData: Post;
  business: Business | null;
  onRefresh: () => void;
}
export const ProductDetails = ({ rowData, business, onRefresh }: ProductDetailsProps) => {
  const { price, stockAmount, _id: postId, stockAmountAvailable, amountInProcess } = rowData;

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

  const renderUnit = (value: number | undefined) => {
    if (isNullOrUndefined(value)) return '';

    return `${value} ${value === 1 ? 'unidad' : 'unidades'}`;
  };

  return (
    <div className="w-32">
      {renderKey('Precio')}
      {renderValue(`${price} ${business?.currency}`)}

      <Divider className="!my-1" />

      {renderKey('En proceso de venta')}
      {renderValue(renderUnit(amountInProcess))}
      <Divider className="!my-1" />

      {isNumber(stockAmount) ? (
        <>
          {renderKey('Total de unidades')}
          {renderValue(
            <PostAmount
              value={stockAmount}
              postId={postId}
              onAfterSuccess={onRefresh}
              error={stockAmount === 0}
              min={amountInProcess}
            />
          )}

          <div className="my-2" />

          {renderKey('Disponibles', { error: stockAmountAvailable === 0 })}
          {renderValue(renderUnit(stockAmountAvailable), { error: stockAmountAvailable === 0 })}
        </>
      ) : (
        <>
          {renderKey('Existencias')}
          {renderValue('Desabilitado', { error: true })}
        </>
      )}
    </div>
  );
};
