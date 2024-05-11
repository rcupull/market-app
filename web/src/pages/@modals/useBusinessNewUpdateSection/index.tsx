import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { PostType } from 'types/post';
import { getSectionFromBusiness } from 'utils/business';
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
    open: (args?: { sectionId?: string; postType?: PostType; onAfterSuccess?: () => void }) => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const { sectionId, onAfterSuccess, postType } = args || {};
            const { onClose } = useModal();
            const portal = usePortal();
            const { business } = useBusiness();

            const { section } =
              (sectionId && getSectionFromBusiness({ business, sectionId })) || {};

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
            return {
              title: getTitle(),
              content: (
                <Component
                  portal={portal}
                  section={section}
                  postType={realPostType}
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
