import { ClothingSizeGroup } from 'components/clothing-size-group';
import { ColorCircleGroup } from 'components/color-circle-group';
import { EmptyImage } from 'components/empty-image';
import { LabelValuePair } from 'components/label-value-pair';

import { Shopping } from 'types/shopping';
import { getImageEndpoint } from 'utils/api';
import { cn } from 'utils/general';
import { getShoppingData } from 'utils/shopping';

export interface ShoppingDetailsProps {
  shopping: Shopping;
  onClick?: () => void;
  getActions?: (args: { shopping: Shopping }) => React.ReactNode;
}

export const ShoppingDetails = ({ shopping, onClick, getActions }: ShoppingDetailsProps) => {
  const { posts, currency } = shopping;

  const { totalPrice, totalProducts } = getShoppingData(shopping);

  return (
    <div
      onClick={onClick}
      className={cn('w-full p-3', {
        'cursor-pointer': onClick,
      })}
    >
      <div className="flex items-center gap-1">{getActions?.({ shopping })}</div>

      <div className="flex flex-col gap-2 mt-2">
        {posts.map(({ postData, count, purshaseNotes }, index) => {
          const { name, price, images } = postData;
          const { interestedByClothingSizes, interestedByColors } = purshaseNotes || {};

          const mainImage = images?.[0];

          return (
            <div key={index} className="bg-gray-100 rounded-lg border-2 border-gray-200  p-2">
              <div className="flex flex-col sm:flex-row gap-2 items-center justify-between  rounded-md">
                <div className="flex items-center gap-2 ">
                  <div className="flex-shrink-0">
                    {mainImage ? (
                      <img src={getImageEndpoint(mainImage.src)} className="w-8" />
                    ) : (
                      <EmptyImage className="size-8" />
                    )}
                  </div>
                  <span className="text-wrap max-w-48 flex-grow">{name}</span>
                </div>

                <div className="flex gap-2">
                  <span>{`${count} ${count === 1 ? 'unidad' : 'unidades'}`}</span>

                  <span>{`${price} ${currency}`}</span>
                </div>
              </div>

              {(!!interestedByColors?.length || !!interestedByClothingSizes?.length) && (
                <div className="flex items-center flex-wrap justify-center gap-6 w-full my-2">
                  <ColorCircleGroup value={interestedByColors} size="small" />
                  <ClothingSizeGroup value={interestedByClothingSizes} />
                </div>
              )}
            </div>
          );
        })}

        <div className="flex justify-center sm:justify-end">
          <div className="flex flex-col sm:flex-row gap-2 border-2 border-gray-400 rounded-xl p-2">
            <LabelValuePair
              label="Total"
              value={` ${totalProducts} ${totalProducts === 1 ? 'unidad' : 'unidades'}`}
            />
            <LabelValuePair label="Precio" value={` ${totalPrice} ${currency}`} />
          </div>
        </div>
      </div>
    </div>
  );
};
