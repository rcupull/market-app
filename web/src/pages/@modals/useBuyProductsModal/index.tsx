import { Badge } from 'components/badge';
import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() =>
  import('./Component').then((m) => ({
    default: m.Component,
  })),
);

export const useBuyProductsModal = () => {
  const { pushModal } = useModal();

  return {
    open: () => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            return {
              badge: <Badge variant="cart" />,
              content: <Component />,
              customBtn: <ButtonClose className="ml-auto" />,
              className: '!min-w-[50rem]',
            };
          },
        },
        { emergent: true },
      );
    },
  };
};
