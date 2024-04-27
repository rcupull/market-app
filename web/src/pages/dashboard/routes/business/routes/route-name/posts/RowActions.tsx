import { Badge } from 'components/badge';
import { ButtonRemove } from 'components/button-remove';
import { ButtonSave } from 'components/button-save';
import { IconButtonDuplicate } from 'components/icon-button-duplicate';
import { IconButtonOptionsBars } from 'components/icon-button-options-bars';
import { IconButtonRemove } from 'components/icon-button-remove';
import { IconButtonShowHide } from 'components/icon-button-show-hide';
import { IconButtonUpdate } from 'components/icon-button-update';
import { IconButtonView } from 'components/icon-button-view';
import { Menu } from 'components/menu';

import { useDuplicateOnePost } from 'features/api/posts/useDuplicateOnePost';
import { useRemoveOnePost } from 'features/api/posts/useRemoveOnePost';
import { useUpdateOnePost } from 'features/api/posts/useUpdateOnePost';
import { useModal } from 'features/modal/useModal';

import { CallAfarResources, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useRouter } from 'hooks/useRouter';

import { RowActionsContainer } from 'pages/@common/row-actions-container';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { Post } from 'types/post';
import { getOnePostRoute } from 'utils/business';

export interface RowActionsProps {
  rowData: Post;
  callAfarResources?: CallAfarResources;
}
export const RowActions = ({ rowData, callAfarResources }: RowActionsProps) => {
  const { pushModal } = useModal();
  const { pushRoute } = useRouter();
  const { business } = useBusiness();

  const { onCallAfar } = useCallFromAfar();

  const handleDelete = () => {
    pushModal(
      'Confirmation',
      {
        useProps: () => {
          const { removeOnePost } = useRemoveOnePost();
          const { onClose } = useModal();
          const { onCallAfar } = useCallFromAfar();
          return {
            content: (
              <div>
                <span>
                  Al eliminar esta publicación seran borradas todas las imágenes y datos asociados
                  al mismo de manera <span className="font-bold">permanente</span>. Seguro que desea
                  eliminar esta publicación?
                </span>
              </div>
            ),
            badge: <Badge variant="warning" />,
            primaryBtn: (
              <ButtonRemove
                isBusy={removeOnePost.status.isBusy}
                onClick={() =>
                  removeOnePost.fetch(
                    { id: rowData._id },
                    {
                      onAfterSuccess: () => {
                        onClose();

                        onCallAfar(callAfarResources);
                      },
                    },
                  )
                }
              />
            ),
          };
        },
      },
      { emergent: true },
    );
  };

  const handleShowHide = (hidden: boolean) => {
    pushModal(
      'Confirmation',
      {
        useProps: () => {
          const { updateOnePost } = useUpdateOnePost();
          const { onClose } = useModal();
          const { onCallAfar } = useCallFromAfar();
          return {
            content: (
              <div>
                <span>
                  Al {`${hidden ? 'ocultar' : 'mostrar'}`} esta publicación no serán perdidos los
                  datos de la misma. Solo se controla la visibilidad en la página de su negocio.
                  Seguro que desea {`${hidden ? 'ocultar' : 'mostrar'}`} esta publicación?
                </span>
              </div>
            ),
            badge: <Badge variant="warning" />,
            primaryBtn: (
              <ButtonSave
                isBusy={updateOnePost.status.isBusy}
                label={hidden ? 'Ocultar' : 'Mostrar'}
                onClick={() =>
                  updateOnePost.fetch(
                    { postId: rowData._id, hidden },
                    {
                      onAfterSuccess: () => {
                        onClose();
                        onCallAfar(callAfarResources);
                      },
                    },
                  )
                }
              />
            ),
          };
        },
      },
      { emergent: true },
    );
  };

  const { duplicateOnePost } = useDuplicateOnePost();

  const handleDuplicate = () => {
    duplicateOnePost.fetch(
      {
        postId: rowData._id,
      },
      {
        onAfterSuccess: () => {
          onCallAfar(callAfarResources);
        },
      },
    );
  };

  const handleUpdate = () => {
    pushModal('PostNew', {
      postId: rowData._id,
      callAfarResources,
    });
  };

  return (
    <>
      <Menu
        buttonElement={<IconButtonOptionsBars />}
        items={[
          { label: 'Eliminar', onClick: handleDelete },
          {
            label: rowData.hidden ? 'Mostrar' : 'Ocultar',
            onClick: () => handleShowHide(!rowData.hidden),
          },
          { label: 'Editar', onClick: handleUpdate },
          { label: 'Duplicar', onClick: handleDuplicate },
          {
            label: 'Ver',
            onClick: () =>
              business &&
              pushRoute(getOnePostRoute({ routeName: business.routeName, postId: rowData._id })),
          },
        ]}
        className="sm:hidden"
      />

      <RowActionsContainer className="hidden sm:flex">
        <IconButtonRemove onClick={handleDelete} />
        <IconButtonShowHide
          hidden={rowData.hidden}
          onClick={() => handleShowHide(!rowData.hidden)}
        />
        <IconButtonUpdate onClick={handleUpdate} />
        <IconButtonDuplicate onClick={handleDuplicate} isBusy={duplicateOnePost.status.isBusy} />

        <IconButtonView
          stopPropagation
          onClick={() =>
            business &&
            pushRoute(getOnePostRoute({ routeName: business.routeName, postId: rowData._id }))
          }
        />
      </RowActionsContainer>
    </>
  );
};
