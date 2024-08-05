import { useState } from 'react';

import { FormFieldWrapper } from 'components/form-field-wrapper';
import { HighlightedBox } from 'components/highlighted-box';
import { Input } from 'components/input';

import { DeliveryConfig } from 'types/business';
import { getDeliveryConfigPrice } from 'utils/delivery';

export interface PriceTestingProps {
  deliveryConfig?: DeliveryConfig;
}

export const PriceTesting = ({ deliveryConfig }: PriceTestingProps) => {
  const [distance, setDistance] = useState<number>(0);

  const { price } = getDeliveryConfigPrice({
    deliveryConfig,
    distance
  });

  return (
    <HighlightedBox className="mt-6" variant="info">
      <div className="flex flex-col gap-4 m-2">
        <div className="text-lg font-bold text-gray-500">Pruebas de distancia</div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <FormFieldWrapper label="Distancia(km)">
            <Input
              placeholder="Distancia(km)"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              type="number"
            />
          </FormFieldWrapper>

          <FormFieldWrapper label="Importe total de la entrega">
            <span>{price}</span>
          </FormFieldWrapper>
        </div>
      </div>
    </HighlightedBox>
  );
};
