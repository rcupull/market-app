import { Badge } from 'components/badge';
import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useBusinessShoppingTermsAndConditionsModal = () => {
  const { pushModal } = useModal();

  return {
    businessShoppingTermsAndConditionsModal: {
      open: () => {
        pushModal('Emergent', {
          useProps: () => {
            const portal = usePortal();

            return {
              title: 'Términos y condiciones para la venta de productos',
              badge: <Badge variant="cart" />,
              content: <Component portal={portal} />,
              secondaryBtn: <ButtonClose />,
              primaryBtn: <div ref={portal.ref} />
            };
          }
        });
      }
    }
  };
};
