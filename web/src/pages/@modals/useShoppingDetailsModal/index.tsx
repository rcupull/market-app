import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { Shopping } from 'types/shopping';
import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useShoppingDetailsModal = () => {
  const { pushModal } = useModal();

  return {
    shoppingDetailsModal: {
      open: (args: { shopping: Shopping }) => {
        pushModal('Emergent', {
          useProps: () => {
            const { shopping } = args;

            return {
              title: 'Detalles de la orden de compra',
              content: <Component shopping={shopping} />,
              customBtn: <ButtonClose className="ml-auto" />
            };
          }
        });
      }
    }
  };
};
