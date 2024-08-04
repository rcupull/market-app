import { useRef } from 'react';

import { Badge } from 'components/badge';
import { BulkActions, BulkActionsProps, BulkMeta } from 'components/bulk-actions';
import { ButtonRemove } from 'components/button-remove';
import { ButtonSave } from 'components/button-save';
import { IconButtonOptionsBars } from 'components/icon-button-options-bars';
import { Menu } from 'components/menu';

import { useDeleteManyPosts } from 'features/api/bulk/useDeleteManyPosts';
import { useUpdateManyPosts } from 'features/api/bulk/useUpdateManyPosts';
import { useModal } from 'features/modal/useModal';

import { GetAllPostsQuery } from 'types/api';
import { Business } from 'types/business';
import { Post } from 'types/post';

type Actions = 'remove' | 'hide' | 'show';
export interface BulkActionsLinksProps extends Pick<BulkActionsProps<Actions, Post>, 'children'> {
  onRefresh: () => void;
  filters: GetAllPostsQuery;
  business: Business | null;
}

export const BulkActionsLinks = ({
  onRefresh,
  filters,
  business,
  ...omittedProps
}: BulkActionsLinksProps) => {
  const { pushModal } = useModal();
  //@ts-expect-error ignore this, need complete default values
  const refMeta = useRef<BulkMeta<Post>>({});

  if (!business) return <></>;

  const { routeName } = business;

  const handleDelete = () => {
    pushModal('Confirmation', {
      useProps: () => {
        const { deleteManyPosts } = useDeleteManyPosts();
        const { onClose } = useModal();
        return {
          content: (
            <div>
              <span>
                Al eliminar estas publicaciones seran borradas todas las imágenes y datos asociados
                a las mismas de manera <span className="font-bold">permanente</span>. Seguro que
                desea eliminar estas publicaciones?
              </span>
            </div>
          ),
          badge: <Badge variant="error" />,
          primaryBtn: (
            <ButtonRemove
              isBusy={deleteManyPosts.status.isBusy}
              onClick={() => {
                const { selected, selectedAll, onReset } = refMeta.current;

                const onAfterSuccess = () => {
                  onClose();
                  onReset();
                  onRefresh();
                };
                const { postCategoriesMethod, postCategoriesTags, search } = filters;

                if (selectedAll) {
                  return deleteManyPosts.fetch(
                    {
                      routeName,
                      query: { postCategoriesMethod, postCategoriesTags, search }
                    },
                    { onAfterSuccess }
                  );
                }

                if (selected.length > 0) {
                  return deleteManyPosts.fetch(
                    {
                      routeName,
                      query: { postCategoriesMethod, postCategoriesTags, search },
                      ids: selected.map((p) => p._id)
                    },
                    { onAfterSuccess }
                  );
                }
              }}
            />
          )
        };
      }
    });
  };

  const handleShowHide = (hidden: boolean) => {
    pushModal('Confirmation', {
      useProps: () => {
        const { updateManyPosts } = useUpdateManyPosts();
        const { onClose } = useModal();
        return {
          content: (
            <div>
              <span>
                Al {`${hidden ? 'ocultar' : 'mostrar'}`} no se perderá ningun dato delas mismas.
                Solo se controla la visibilidad en la página de su negocio Seguro que desea{' '}
                {`${hidden ? 'ocultar' : 'mostrar'}`} estas publicaciones?
              </span>
            </div>
          ),
          badge: <Badge variant="warning" />,
          primaryBtn: (
            <ButtonSave
              isBusy={updateManyPosts.status.isBusy}
              label={hidden ? 'Ocultar' : 'Mostrar'}
              onClick={() => {
                const { selected, selectedAll, onReset } = refMeta.current;

                const onAfterSuccess = () => {
                  onClose();
                  onReset();
                  onRefresh();
                };
                const { postCategoriesMethod, postCategoriesTags, search } = filters;

                if (selectedAll) {
                  return updateManyPosts.fetch(
                    {
                      routeName,
                      update: { hidden },
                      query: {
                        postCategoriesMethod,
                        postCategoriesTags,
                        search
                      }
                    },
                    { onAfterSuccess }
                  );
                }

                if (selected.length > 0) {
                  return updateManyPosts.fetch(
                    {
                      routeName,
                      update: { hidden },
                      query: {
                        postCategoriesMethod,
                        postCategoriesTags,
                        search
                      },
                      ids: selected.map((p) => p._id)
                    },
                    { onAfterSuccess }
                  );
                }
              }}
            />
          )
        };
      }
    });
  };

  return (
    <BulkActions<Actions, Post>
      refMeta={refMeta}
      getBulkActionBtnProps={({ action }) => {
        switch (action) {
          case 'remove':
            return {
              label: 'Eliminar enlaces',
              onClick: () => handleDelete()
            };
          case 'hide':
            return {
              label: 'Ocultar enlaces',
              onClick: () => handleShowHide(true)
            };
          case 'show':
            return {
              label: 'Mostrar enlaces',
              onClick: () => handleShowHide(false)
            };
          default:
            return {};
        }
      }}
      renderMenuNode={({ setAction }) => (
        <Menu
          buttonElement={<IconButtonOptionsBars />}
          items={[
            {
              label: 'Eliminar enlaces',
              onClick: () => setAction('remove')
            },
            {
              label: 'Ocultar enlaces',
              onClick: () => setAction('hide')
            },
            {
              label: 'Mostrar enlaces',
              onClick: () => setAction('show')
            }
          ]}
        />
      )}
      {...omittedProps}
    />
  );
};
