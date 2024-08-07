import { Badge } from 'components/badge';
import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useBusinessUpdateBankAccounts = () => {
  const { pushModal } = useModal();

  return {
    businessUpdateBankAccounts: {
      open: () => {
        pushModal('Emergent', {
          useProps: () => {
            const portal = usePortal();

            return {
              title: 'Cuentas de Banco',
              badge: <Badge variant="info" />,
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
