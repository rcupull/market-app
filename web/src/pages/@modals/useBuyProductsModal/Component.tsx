import { useState } from 'react';

import { Button } from 'components/button';
import { Tabs, TabsProps } from 'components/tabs';

import { PurchaseOrder } from './sub-components/purchase-order';
import { ShoppingCart } from './sub-components/shooping-cart';
import { WhatsAppMessage } from './sub-components/whatsApp-message';
import { StepCommonProps } from './types';

import SvgAngleLeftSolid from 'icons/AngleLeftSolid';
import SvgAngleRightSolid from 'icons/AngleRightSolid';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { cn } from 'utils/general';

export const Component = () => {
  const [selected, setSelected] = useState(0);
  const { business } = useBusiness();

  /////////////////////////////////////////////////////////////////////////////////
  const backButton = (
    <Button
      label="Atrás"
      svg={SvgAngleLeftSolid}
      variant="link"
      onClick={() => {
        if (selected > 0) {
          setSelected(selected - 1);
        }
      }}
    />
  );

  const nextButton = (
    <Button
      label="Siguiente"
      svg={SvgAngleRightSolid}
      svgPosition="right"
      variant="link"
      onClick={() => {
        if (selected < items.length - 1) {
          setSelected(selected + 1);
        }
      }}
    />
  );

  /////////////////////////////////////////////////////////////////////////////////

  const commonProps: StepCommonProps = {
    backButton,
    nextButton,
  };

  /////////////////////////////////////////////////////////////////////////////////

  const items: TabsProps['items'] = [
    {
      label: 'Productos',
      content: <ShoppingCart {...commonProps} />,
    },
    {
      label: 'Crear orden de compra',
      content: <PurchaseOrder {...commonProps} />,
    },
    business?.shoppingStrategy === 'addToCart_whatsAppWithOwner_pickUpProduct' && {
      label: 'Contactar con el vendedor',
      content: <WhatsAppMessage {...commonProps} />,
    },
  ];

  /////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <Tabs
        className="justify-between"
        contentClassName="w-full mt-8"
        onSelect={setSelected}
        selected={selected}
        itemRender={({ label, selected, index }) => (
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'border-2 border-gray-400 rounded-full w-8 h-8 flex items-center justify-center',
                {
                  'font-semibold !border-indigo-500': selected,
                },
              )}
            >
              {index + 1}
            </div>
            <div
              className={cn({
                'font-semibold': selected,
              })}
            >
              {label}
            </div>
          </div>
        )}
        items={items}
      />
    </>
  );
};
