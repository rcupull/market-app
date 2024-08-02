import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useBusinessUpdatePostFormModal = () => {
  const { pushModal } = useModal();

  return {
    businessUpdatePostFormModal: {
      open: (args?: { onAfterSuccess?: () => void }) => {
        pushModal('Emergent', {
          useProps: () => {
            const portal = usePortal();
            const { onClose } = useModal();

            return {
              title: 'Formulario de publicación',
              content: (
                <Component
                  portal={portal}
                  onAfterSuccess={() => {
                    onClose();
                    args?.onAfterSuccess?.();
                  }}
                />
              ),
              secondaryBtn: <ButtonClose />,
              primaryBtn: <div ref={portal.ref} />,
            };
          },
        });
      },
    },
  };
};
