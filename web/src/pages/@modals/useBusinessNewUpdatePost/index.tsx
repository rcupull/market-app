import { useEffect } from 'react';

import { ButtonClose } from 'components/button-close';

import { useGetOnePost } from 'features/api/posts/useGetOnePost';
import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() =>
  import('./Component').then((m) => ({
    default: m.Component,
  })),
);

export const useBusinessNewUpdatePost = () => {
  const { pushModal } = useModal();

  return {
    open: (args?: { postId?: string; onAfterSuccess?: () => void }) => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const { postId, onAfterSuccess } = args || {};
            const { onClose } = useModal();
            const portal = usePortal();
            const { getOnePost } = useGetOnePost();

            useEffect(() => {
              if (postId) {
                getOnePost.fetch({ id: postId });
              }
            }, []);

            const getContent = () => {
              if (getOnePost.status.isBusy) {
                return <></>;
              }

              return (
                <Component
                  portal={portal}
                  post={getOnePost.data}
                  onAfterSuccess={() => {
                    onAfterSuccess?.();
                    onClose();
                  }}
                />
              );
            };
            return {
              title: postId ? 'Editar publicación' : 'Nueva publicación',
              isBusy: getOnePost.status.isBusy,
              content: getContent(),
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
