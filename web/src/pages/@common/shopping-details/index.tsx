import { EmptyImage } from 'components/empty-image';
import { LabelValuePair } from 'components/label-value-pair';

import { Shopping } from 'types/shopping';
import { cn } from 'utils/general';
import { getShoppingData, getShoppingStateLabel } from 'utils/shopping';

export interface ShoppingDetailsProps {
  shopping: Shopping;
  onClick?: () => void;
}

export const ShoppingDetails = ({ shopping, onClick }: ShoppingDetailsProps) => {
  const { state, posts } = shopping;

  const { totalPrice, totalProducts } = getShoppingData(shopping);

  return (
    <div
      onClick={onClick}
      className={cn('w-full p-3', {
        'cursor-pointer': onClick,
      })}
    >
      <div className="flex items-center gap-1">
        <span>Estado:</span>
        <span
          className={cn('font-bold', {
            'text-yellow-500': state === 'REQUESTED',
            'text-gray-300': state === 'CONSTRUCTION',
            'text-red-500': state === 'REJECTED' || state === 'CANCELED',
          })}
        >
          {getShoppingStateLabel(state)}
        </span>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {posts.map(({ postData, count }, index) => {
          const { name, currency, price, images } = postData;

          const mainImage = images?.[0];

          return (
            <div
              className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
              key={index}
            >
              <div className="flex-shrink-0">
                {mainImage ? (
                  <img src={mainImage.src} className="w-8" />
                ) : (
                  <EmptyImage className="w-8" />
                )}
              </div>
              <span className="text-wrap max-w-48 flex-grow">{name}</span>

              <span>{`${count} ${count === 1 ? 'unidad' : 'unidades'}`}</span>

              <span>{`${price} ${currency}`}</span>
            </div>
          );
        })}

        <div className="flex justify-end gap-4">
          <LabelValuePair
            label="Total"
            value={` ${totalProducts} ${totalProducts === 1 ? 'unidad' : 'unidades'}`}
          />
          <LabelValuePair label="Precio" value={` ${totalPrice} CUP`} />
        </div>
      </div>
    </div>
  );
};
