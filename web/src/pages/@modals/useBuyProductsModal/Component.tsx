import { Stepper } from 'components/stepper';

import { CheckingData } from './sub-components/checking-data';
import { PurchaseOrderSuccess } from './sub-components/purchase-order-success';
import { ShoppingCart } from './sub-components/shooping-cart';

export const Component = () => {
  return (
    <>
      <Stepper
        items={[
          {
            label: 'Productos',
            render: (props) => <ShoppingCart {...props} />,
          },
          {
            label: 'Verificar los datos',
            render: (props) => <CheckingData {...props} />,
          },
          {
            label: 'Orden de compra creada',
            render: (props) => <PurchaseOrderSuccess {...props} />,
          },
        ]}
      />
    </>
  );
};

export default Component;
