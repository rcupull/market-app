import { Badge } from 'components/badge';

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
              className: '!min-w-[50rem]',
            };
          },
        },
        { emergent: true },
      );
    },
  };
};
