import { Badge } from 'components/badge';

import { useModal } from 'features/modal/useModal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useBuyProductsModal = () => {
  const { pushModal } = useModal();

  return {
    buyProductsModal: {
      open: () => {
        pushModal('Emergent', {
          useProps: () => {
            return {
              title: 'Crear orden de compra',
              badge: <Badge variant="cart" />,
              content: <Component />,
              className: '!w-[95vw] sm:!max-w-[50rem]'
            };
          }
        });
      }
    }
  };
};
