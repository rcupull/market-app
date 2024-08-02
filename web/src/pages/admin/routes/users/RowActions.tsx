import { Badge } from 'components/badge';
import { ButtonRemove } from 'components/button-remove';
import { IconButton } from 'components/icon-button';
import { IconButtonRemove } from 'components/icon-button-remove';

import { useRemoveOneUserAdmin } from 'features/api/admin/useRemoveOneUserAdmin';
import { useModal } from 'features/modal/useModal';

import SvgKeySolid from 'icons/KeySolid';
import { RowActionsContainer } from 'pages/@common/row-actions-container';
import { useAdminUpdateUserAccessModal } from 'pages/@modals/useAdminUpdateUserAccessModal';
import { User } from 'types/auth';

export interface RowActionsProps {
  rowData: User;
  onRefresh: () => void;
}
export const RowActions = ({ rowData, onRefresh }: RowActionsProps) => {
  const { pushModal } = useModal();
  const { role } = rowData;

  const { adminUpdateUserAccessModal } = useAdminUpdateUserAccessModal();

  const handleDelete = () => {
    pushModal('Confirmation', {
      useProps: () => {
        const { removeOneUserAdmin } = useRemoveOneUserAdmin();
        const { onClose } = useModal();
        return {
          content: (
            <div>
              <span>Seguro que desea eliminar este usuario?</span>
            </div>
          ),
          badge: <Badge variant="error" />,
          primaryBtn: (
            <ButtonRemove
              isBusy={removeOneUserAdmin.status.isBusy}
              onClick={() =>
                removeOneUserAdmin.fetch(
                  { id: rowData._id },
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
      <IconButtonRemove onClick={handleDelete} />

      {role === 'admin' && (
        <IconButton
          svg={SvgKeySolid}
          title="Accesos Especiales"
          onClick={() =>
            adminUpdateUserAccessModal.open({ user: rowData, onAfterSuccess: () => onRefresh() })
          }
        />
      )}
    </RowActionsContainer>
  );
};
