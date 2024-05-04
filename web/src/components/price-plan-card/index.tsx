import { Button } from 'components/button';

import SvgCheckSolid from 'icons/CheckSolid';
import SvgTimesSolid from 'icons/TimesSolid';
import { cn } from 'utils/general';

interface PriceItem {
  description: string;
  included: boolean;
}
export interface PricePlanCardProps {
  items: Array<PriceItem>;
  price: number;
  name: string;
  description: string;
  popular?: boolean;
  free?: boolean;
  onClick?: () => void;
}

export const PricePlanCard = ({
  items,
  price,
  description,
  name,
  popular,
  free,
  onClick,
}: PricePlanCardProps) => {
  return (
    <div
      className={cn(
        'w-11/12 sm:w-10/12 md:w-9/12 lg:w-96 rounded-2xl bg-gray-50 py-8 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center',
        {
          'ring-indigo-500 ring-2': popular,
        },
      )}
    >
      <div className="mx-auto max-w-sm px-8">
        <div className="w-full flex justify-between items-center text-xl font-bold text-indigo-600">
          <h2>{name}</h2>

          {popular && (
            <div className="rounded-full px-2 text-xs font-semibold leading-6 tracking-wide text-indigo-600 bg-indigo-100">
              Más popular
            </div>
          )}
        </div>

        <p className="text- text-gray-600 mt-3 text-start h-24">{description}</p>

        <p className="mt-6 flex items-baseline gap-x-2">
          <span className="text-3xl font-bold tracking-tight text-gray-900">{price}</span>
          <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
            CUP/mensual
          </span>
        </p>

        <Button
          label={free ? 'Comenzar' : 'Contratar'}
          className={cn('mt-6 w-full', {
            'text-indigo-600 ring-indigo-600': !popular,
          })}
          variant={popular ? 'primary' : 'outlined'}
          onClick={onClick}
        />

        <div className="mt-6">
          {items.map(({ description, included }, index) => {
            return (
              <div key={index} className="flex items-center mt-2">
                {included ? (
                  <SvgCheckSolid className="h-5 w-5 fill-indigo-700" />
                ) : (
                  <SvgTimesSolid className="h-5 w-5 fill-red-700" />
                )}

                <span className="text-sm leading-6 text-gray-900 ml-2">{description}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
