import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { Shopping } from 'types/shopping';
import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() =>
  import('./Component').then((m) => ({
    default: m.Component,
  })),
);

export const useShoppingDetailsModal = () => {
  const { pushModal } = useModal();

  return {
    open: (args: { shopping: Shopping }) => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const { shopping } = args;

            return {
              title: 'Detalles de la compra',
              content: <Component shopping={shopping} />,
              customBtn: <ButtonClose className="ml-auto" />,
            };
          },
        },
        { emergent: true },
      );
    },
  };
};
