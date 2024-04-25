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
    open: (args?: { sectionId?: string }) => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const { sectionId } = args || {};

            const portal = usePortal();

            return {
              title: 'Informaciones básicas de su negocio',
              content: <Component portal={portal} sectionId={sectionId} />,
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
