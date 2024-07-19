import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useBusinessUpdatePostCategoriesModal = () => {
  const { pushModal } = useModal();

  return {
    open: (args?: { onAfterSuccess: () => void }) => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const portal = usePortal();
            const { onClose } = useModal();

            return {
              title: 'Categorías',
              content: (
                <Component
                  portal={portal}
                  onAfterSuccess={() => {
                    args?.onAfterSuccess?.();
                    onClose();
                  }}
                />
              ),
              secondaryBtn: <ButtonClose />,
              primaryBtn: <div ref={portal.ref} />,
            };
          },
        },
        { emergent: true }
      );
    },
  };
};
