import { Divider } from 'components/divider';

import { PostAmount } from './PostAmount';

import { Business } from 'types/business';
import { Post } from 'types/post';
import { cn, isNumber } from 'utils/general';

export interface ProductDetailsProps {
  rowData: Post;
  business: Business | null;
  onRefresh: () => void;
}
export const ProductDetails = ({ rowData, business, onRefresh }: ProductDetailsProps) => {
  const { price, stockAmount, _id: postId, stockAmountAvailable , hidden} = rowData;

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
      {renderKey('Visibilidad')}
      {renderValue(hidden ? 'Oculto' : 'Visible', { error: hidden })}

      {renderKey('Precio')}
      {renderValue(`${price} ${business?.currency}`)}

      <Divider className="!my-1" />

      {isNumber(stockAmount) ? (
        <>
          {renderKey('Existencias')}
          {renderValue(
            <PostAmount
              value={stockAmount}
              postId={postId}
              onAfterSuccess={onRefresh}
              error={stockAmount === 0}
            />,
          )}
          <Divider className="!my-1" />

          {renderKey('Disponible para venta', { error: stockAmountAvailable === 0 })}
          {renderValue(stockAmountAvailable, { error: stockAmountAvailable === 0 })}
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

// const getDetailsItems = () => {
//   const out: Array<KeyValueListItem> = [
//     {
//       label: (
//         <span
//           className={cn({
//             'text-red-500': hidden,
//           })}
//         >{`${hidden ? 'Oculta' : 'Visible'}`}</span>
//       ),
//       value: null,
//     },
//     {
//       label: 'Precio',
//       value: `${price} ${business?.currency}`,
//     },
//   ];

//   if (isNumber(stockAmount)) {
//     out.push({
//       label: (
//         <span
//           className={cn({
//             'text-red-500': stockAmount === 0,
//           })}
//         >
//           Existencias
//         </span>
//       ),
//       value: (
//       ),
//     });

//     out.push({
//       label: (
//         <span
//           className={cn({
//             'text-red-500': stockAmountAvailable === 0,
//           })}
//         >
//           Disponibles
//         </span>
//       ),
//       value: (
//         <span
//           className={cn({
//             'text-red-500': stockAmountAvailable === 0,
//           })}
//         >
//           {stockAmountAvailable}
//         </span>
//       ),
//     });
//   } else {
//     out.push({
//       label: 'Existencias',
//       value: <span className="text-red-500">Desabilitado</span>,
//     });
//   }

//   return out;
// };
