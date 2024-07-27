import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useBusinessUpdateBannerModal = () => {
  const { pushModal } = useModal();

  return {
    businessUpdateBannerModal: {
      open: (args?: { onAfterSuccess?: () => void }) => {
        pushModal(
          'Emergent',
          {
            useProps: () => {
              const { onAfterSuccess } = args || {};
              const { onClose } = useModal();
              const portal = usePortal();

              return {
                title: 'Banner',
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
    },
  };
};
