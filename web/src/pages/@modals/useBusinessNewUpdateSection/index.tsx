import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { PostType } from 'types/post';
import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const ComponentLink = dynamic(() =>
  import('./ComponentLink').then((m) => ({
    default: m.ComponentLink,
  })),
);

//eslint-disable-next-line
const ComponentProduct = dynamic(() =>
  import('./ComponentProduct').then((m) => ({
    default: m.ComponentProduct,
  })),
);

export const useBusinessNewUpdateSection = () => {
  const { pushModal } = useModal();

  return {
    open: (args?: { sectionId?: string; postType?: PostType; onAfterSuccess?: () => void }) => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const { sectionId, onAfterSuccess, postType } = args || {};
            const { onClose } = useModal();
            const portal = usePortal();
            const { getSections } = useBusiness();

            const [section] = sectionId ? getSections({ ids: [sectionId] }) : [];

            const realPostType = postType || section?.postType;

            const getTitle = () => {
              if (!realPostType) {
                return 'Cargando...';
              }

              if (sectionId) {
                return realPostType == 'product'
                  ? 'Editar sección de productos'
                  : 'Editar sección de enlaces';
              } else {
                return realPostType == 'product'
                  ? 'Nueva sección de productos'
                  : 'Nueva sección de enlaces';
              }
            };

            const Component = realPostType === 'product' ? ComponentProduct : ComponentLink;

            return {
              title: getTitle(),
              content: (
                <Component
                  portal={portal}
                  section={section}
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
