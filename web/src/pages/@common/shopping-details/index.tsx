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
      className={cn('w-[35rem] p-3', {
        'cursor-pointer': onClick,
      })}
    >
      <div className="flex items-center gap-1">
        <span>Estado:</span>
        <span
          className={cn('font-bold', {
            'text-green-500': state === 'DELIVERED',
            'text-yellow-500': state === 'REQUESTED',
            'text-gray-300': state === 'CONSTRUCTION',
            'text-gray-500': state === 'CANCELED',
          })}
        >
          {getShoppingStateLabel(state)}
        </span>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {posts.map(({ post, count }, index) => {
          const { name, currency, price, images } = post;

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

              <span>{`${count} ${count === 1 ? 'artículo' : 'artículos'}`}</span>

              <span>{`${price} ${currency}`}</span>
            </div>
          );
        })}

        <div className="flex justify-end gap-4">
          <LabelValuePair label="Total" value={`${totalProducts}`} />
          <LabelValuePair label="Precio" value={`${totalPrice} CUP`} />
        </div>
      </div>
    </div>
  );
};
