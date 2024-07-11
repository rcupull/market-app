import { useEffect } from 'react';

import { ButtonClose } from 'components/button-close';

import { useGetOnePost } from 'features/api/posts/useGetOnePost';
import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { PostType } from 'types/post';
import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useBusinessNewUpdatePost = () => {
  const { pushModal } = useModal();

  return {
    open: (args: { postId?: string; postType?: PostType; onAfterSuccess?: () => void }) => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const { postId, onAfterSuccess, postType } = args || {};
            const { onClose } = useModal();
            const portal = usePortal();
            const { getOnePost } = useGetOnePost();

            const realPostType = postType || getOnePost.data?.postType;

            useEffect(() => {
              if (postId) {
                getOnePost.fetch({ id: postId });
              }
            }, []);

            const getContent = () => {
              if (getOnePost.status.isBusy && !getOnePost.data) {
                return <></>;
              }

              return (
                <Component
                  portal={portal}
                  post={getOnePost.data}
                  postType={realPostType}
                  onRefreshPost={() => postId && getOnePost.fetch({ id: postId })}
                  onAfterSuccess={() => {
                    onAfterSuccess?.();
                    onClose();
                  }}
                />
              );
            };

            const getTitle = () => {
              if (!realPostType) {
                return 'Cargando...';
              }

              if (postId) {
                return realPostType == 'product' ? 'Editar Producto' : 'Editar Enlace';
              } else {
                return realPostType == 'product' ? 'Nuevo Producto' : 'Nuevo Enlace';
              }
            };
            return {
              title: getTitle(),
              isBusy: getOnePost.status.isBusy && !getOnePost.data,
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
