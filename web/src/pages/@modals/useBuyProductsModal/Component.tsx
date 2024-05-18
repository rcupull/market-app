import { Button } from 'components/button';
import { Stepper } from 'components/stepper';

import { useModal } from 'features/modal/useModal';

import { useRouter } from 'hooks/useRouter';

import { PurchaseOrder } from './sub-components/purchase-order';
import { PurchaseOrderSuccess } from './sub-components/purchase-order-success';
import { ShoppingCart } from './sub-components/shooping-cart';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { getBusinessRoute } from 'utils/business';

export const Component = () => {
  const { onClose } = useModal();
  const { business } = useBusiness();
  const { pushRoute } = useRouter();

  const finishButton = (
    <Button
      variant="link"
      label="Finalizar"
      onClick={() => {
        onClose();
        business && pushRoute(getBusinessRoute({ routeName: business.routeName }));
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
            label: 'Orden de compra creada',
            render: (props) => <PurchaseOrderSuccess {...props} finishButton={finishButton} />,
          },
        ]}
      />
    </>
  );
};
