import { Badge } from 'components/badge';
import { ButtonRemove } from 'components/button-remove';
import { IconButtonRemove } from 'components/icon-button-remove';

import { useRemoveOneBusinessAdmin } from 'features/api/admin/useRemoveOneBusinessAdmin';
import { useModal } from 'features/modal/useModal';

import { RowActionsContainer } from 'pages/@common/row-actions-container';
import { Business } from 'types/business';

export interface RowActionsProps {
  rowData: Business;
  onRefresh: () => void;
}
export const RowActions = ({ rowData, onRefresh }: RowActionsProps) => {
  const { pushModal } = useModal();

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
                    { routeName: rowData.routeName },
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

  return (
    <RowActionsContainer>
      <IconButtonRemove onClick={handleDelete} />
    </RowActionsContainer>
  );
};
