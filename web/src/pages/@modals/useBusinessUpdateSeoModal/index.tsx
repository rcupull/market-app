import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useBusinessUpdateSeoModal = () => {
  const { pushModal } = useModal();

  return {
    businessUpdateSeoModal: {
      open: () => {
        pushModal(
          'Emergent',
          {
            useProps: () => {
              const portal = usePortal();

              return {
                title: 'Optimización de motores de búsqueda',
                content: <Component portal={portal} />,
                secondaryBtn: <ButtonClose />,
                primaryBtn: <div ref={portal.ref} />,
                className: '!w-[95vw] !max-w-[40rem]',
              };
            },
          },
          { emergent: true },
        );
      },
    },
  };
};
