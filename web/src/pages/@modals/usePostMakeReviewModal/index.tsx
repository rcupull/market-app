import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const usePostMakeReviewModal = () => {
  const { pushModal } = useModal();

  return {
    postMakeReviewModal: {
      open: (args: { postId: string; onAfterSuccess: () => void }) => {
        pushModal(
          'Emergent',
          {
            useProps: () => {
              const { onAfterSuccess, postId } = args || {};
              const portal = usePortal();
              const { onClose } = useModal();

              return {
                title: 'Reseña',
                content: (
                  <Component
                    portal={portal}
                    onAfterSuccess={() => {
                      onAfterSuccess?.();
                      onClose();
                    }}
                    postId={postId}
                  />
                ),
                secondaryBtn: <ButtonClose />,
                primaryBtn: <div ref={portal.ref} />,
                className: '!w-[30rem]',
              };
            },
          },
          { emergent: true }
        );
      },
    },
  };
};
