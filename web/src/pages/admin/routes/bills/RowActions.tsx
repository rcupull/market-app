import { Badge } from 'components/badge';
import { ButtonRemove } from 'components/button-remove';
import { IconButtonRemove } from 'components/icon-button-remove';

import { useRemoveOneBillAdmin } from 'features/api/admin/useRemoveOneBillAdmin';
import { useAuth } from 'features/api-slices/useAuth';
import { useModal } from 'features/modal/useModal';

import { RowActionsContainer } from 'pages/@common/row-actions-container';
import { Bill } from 'types/billing';

export interface RowActionsProps {
  rowData: Bill;
  onRefresh: () => void;
}
export const RowActions = ({ rowData, onRefresh }: RowActionsProps) => {
  const { pushModal } = useModal();
  const { getHasSomeAccess } = useAuth();

  const handleDelete = () => {
    pushModal('Confirmation', {
      useProps: () => {
        const { removeOneBillAdmin } = useRemoveOneBillAdmin();

        const { onClose } = useModal();
        return {
          content: (
            <div>
              <span>Seguro que desea eliminar esta factura?</span>
            </div>
          ),
          badge: <Badge variant="error" />,
          primaryBtn: (
            <ButtonRemove
              isBusy={removeOneBillAdmin.status.isBusy}
              onClick={() =>
                removeOneBillAdmin.fetch(
                  { billId: rowData._id },
                  {
                    onAfterSuccess: () => {
                      onClose();

                      onRefresh();
                    },
                  }
                )
              }
            />
          ),
        };
      },
    });
  };

  return (
    <RowActionsContainer>
      {getHasSomeAccess('bills__remove') && <IconButtonRemove onClick={handleDelete} />}
    </RowActionsContainer>
  );
};
