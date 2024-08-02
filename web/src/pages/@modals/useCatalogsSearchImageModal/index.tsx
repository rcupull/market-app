import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { Image } from 'types/general';
import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useCatalogsSearchImageModal = () => {
  const { pushModal } = useModal();

  return {
    catalogsSearchImageModal: {
      open: (args: { onSelected: (images: Array<Image>) => void; multi?: boolean }) => {
        pushModal('Emergent', {
          useProps: () => {
            const { multi, onSelected } = args || {};
            const portal = usePortal();

            return {
              title: 'Catálogos de imágenes',
              content: <Component portal={portal} multi={multi} onSelected={onSelected} />,
              secondaryBtn: <ButtonClose />,
              primaryBtn: <div ref={portal.ref} />,
              className: 'max-h-[calc(100vh-2rem)]',
            };
          },
        });
      },
    },
  };
};
