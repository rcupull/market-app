import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useAdminConfigUpdatePriceModal = () => {
  const { pushModal } = useModal();

  return {
    adminConfigUpdatePriceModal: {
      open: () => {
        pushModal('Emergent', {
          useProps: () => {
            const portal = usePortal();

            return {
              title: 'Precios',
              content: <Component portal={portal} />,
              secondaryBtn: <ButtonClose />,
              primaryBtn: <div ref={portal.ref} />,
              className: '!w-[95vw]'
            };
          }
        });
      }
    }
  };
};
