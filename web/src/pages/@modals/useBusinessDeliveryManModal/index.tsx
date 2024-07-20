import { Badge } from 'components/badge';
import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useBusinessDeliveryManModal = () => {
  const { pushModal } = useModal();

  return {
    open: () => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            return {
              title: 'Mensajeros',
              badge: <Badge variant="truck" />,
              content: <Component />,
              secondaryBtn: <ButtonClose />,
            };
          },
        },
        { emergent: true }
      );
    },
  };
};
