import { Button } from 'components/button';
import { Stepper } from 'components/stepper';

import { useModal } from 'features/modal/useModal';

import { PurchaseOrder } from './sub-components/purchase-order';
import { ShoppingCart } from './sub-components/shooping-cart';
import { WhatsAppMessage } from './sub-components/whatsApp-message';

export const Component = () => {
  const { onClose } = useModal();

  const finishButton = (
    <Button
      variant="link"
      label="Finalizar"
      onClick={() => {
        onClose();
        // business && pushRoute(getBusinessRoute({ routeName: business.routeName }));
      }}
    />
  );

  return (
    <>
      <Stepper
        items={[
          {
            label: 'Productos',
            render: (props) => <ShoppingCart {...props} finishButton={finishButton} />,
          },
          {
            label: 'Crear orden de compra',
            render: (props) => <PurchaseOrder {...props} finishButton={finishButton} />,
          },
          {
            label: 'Contactar con el vendedor',
            render: (props) => <WhatsAppMessage {...props} finishButton={finishButton} />,
          },
        ]}
      />
    </>
  );
};
