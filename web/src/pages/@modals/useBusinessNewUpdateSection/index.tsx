import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() =>
  import('./Component').then((m) => ({
    default: m.Component,
  })),
);

export const useBusinessNewUpdateSection = () => {
  const { pushModal } = useModal();

  return {
    open: (args?: { sectionId?: string; onAfterSuccess?: () => void }) => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const { sectionId, onAfterSuccess } = args || {};
            const { onClose } = useModal();
            const portal = usePortal();

            return {
              title: sectionId ? 'Editar grupo de publicaciones' : 'Crear grupo de publicaciones',
              content: (
                <Component
                  portal={portal}
                  sectionId={sectionId}
                  onAfterSuccess={() => {
                    onAfterSuccess?.();
                    onClose();
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
