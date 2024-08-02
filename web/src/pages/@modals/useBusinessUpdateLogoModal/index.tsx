import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useBusinessUpdateLogoModal = () => {
  const { pushModal } = useModal();

  return {
    businessUpdateLogoModal: {
      open: () => {
        pushModal('Emergent', {
          useProps: () => {
            const portal = usePortal();
            return {
              title: 'Logo',
              content: <Component portal={portal} />,
              secondaryBtn: <ButtonClose />,
              primaryBtn: <div ref={portal.ref} />,
            };
          },
        });
      },
    },
  };
};
