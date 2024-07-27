import { Badge } from 'components/badge';
import { ButtonRemove } from 'components/button-remove';
import { IconButtonRemove } from 'components/icon-button-remove';
import { IconButtonShowHide } from 'components/icon-button-show-hide';

import { useRemoveOneBusinessAdmin } from 'features/api/admin/useRemoveOneBusinessAdmin';
import { useAuth } from 'features/api-slices/useAuth';
import { useModal } from 'features/modal/useModal';

import { RowActionsContainer } from 'pages/@common/row-actions-container';
import { useBusinessShowHide } from 'pages/@hooks/useBusinessShowHide';
import { Business } from 'types/business';

export interface RowActionsProps {
  rowData: Business;
  onRefresh: () => void;
}
export const RowActions = ({ rowData, onRefresh }: RowActionsProps) => {
  const { routeName, hidden } = rowData;
  const { pushModal } = useModal();
  const { getHasSomeAccess } = useAuth();

  const handleDelete = () => {
    pushModal(
      'Confirmation',
      {
        useProps: () => {
          const { removeOneBusinessAdmin } = useRemoveOneBusinessAdmin();

          const { onClose } = useModal();
          return {
            content: (
              <div>
                <span>Seguro que desea eliminar este negocio?</span>
              </div>
            ),
            badge: <Badge variant="error" />,
            primaryBtn: (
              <ButtonRemove
                isBusy={removeOneBusinessAdmin.status.isBusy}
                onClick={() =>
                  removeOneBusinessAdmin.fetch(
                    { routeName },
                    {
                      onAfterSuccess: () => {
                        onClose();

                        onRefresh();
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

  const { onBusinessShowHide } = useBusinessShowHide();

  return (
    <RowActionsContainer>
      {getHasSomeAccess('business__remove') && <IconButtonRemove onClick={handleDelete} />}
      {getHasSomeAccess('business__write') && (
        <IconButtonShowHide
          hidden={hidden}
          onClick={() => {
            onBusinessShowHide(rowData, {
              onAfterSuccess: () => {
                onRefresh();
              },
            });
          }}
        />
      )}
    </RowActionsContainer>
  );
};
