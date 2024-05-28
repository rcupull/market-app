import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useBusinessUpdateShopping = () => {
  const { pushModal } = useModal();

  return {
    open: (args?: { onAfterSuccess?: () => void }) => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const { onAfterSuccess } = args || {};
            const { onClose } = useModal();
            const portal = usePortal();

            return {
              title: 'Gestión de ventas',
              content: (
                <Component
                  portal={portal}
                  onAfterSuccess={() => {
                    onClose();
                    onAfterSuccess?.();
                  }}
                />
              ),
              secondaryBtn: <ButtonClose />,
              primaryBtn: <div ref={portal.ref} />,
            };
          },
        },
        { emergent: true },
      );
    },
  };
};
