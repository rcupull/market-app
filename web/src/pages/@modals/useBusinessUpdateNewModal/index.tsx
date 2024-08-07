import { useEffect } from 'react';

import { Badge } from 'components/badge';
import { ButtonClose } from 'components/button-close';

import { useGetOneBusiness } from 'features/api/business/useGetOneBusiness';
import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { Business } from 'types/business';
import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useBusinessUpdateNewModal = () => {
  const { pushModal } = useModal();

  return {
    businessUpdateNewModal: {
      open: (args?: { routeName?: string; onAfterSucess?: (response?: Business) => void }) => {
        pushModal('Emergent', {
          useProps: () => {
            const { routeName, onAfterSucess } = args || {};
            const portal = usePortal();
            const { onClose } = useModal();
            const { getOneBusiness } = useGetOneBusiness();
            const business = getOneBusiness.data;

            useEffect(() => {
              if (routeName) {
                getOneBusiness.fetch({ routeName });
              }
            }, []);

            return {
              title: business ? 'Editar negocio' : 'Crear negocio',
              badge: <Badge variant="info" />,
              content: (
                <Component
                  portal={portal}
                  business={business}
                  onAfterSuccess={(response?: Business) => {
                    onClose();
                    onAfterSucess?.(response);
                  }}
                />
              ),
              secondaryBtn: <ButtonClose />,
              primaryBtn: <div ref={portal.ref} />,
              isBusy: getOneBusiness.status.isBusy,
              className: '!w-[95vw] !lg:w-[90vw]'
            };
          }
        });
      }
    }
  };
};
