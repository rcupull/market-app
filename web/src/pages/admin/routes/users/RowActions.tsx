import { Badge } from 'components/badge';
import { ButtonRemove } from 'components/button-remove';
import { IconButtonRemove } from 'components/icon-button-remove';

import { useRemoveOneAdminUser } from 'features/api/admin/useRemoveOneAdminUser';
import { useModal } from 'features/modal/useModal';

import { CallAfarResources, useCallFromAfar } from 'hooks/useCallFromAfar';

import { RowActionsContainer } from 'pages/@common/row-actions-container';
import { User } from 'types/auth';

export interface RowActionsProps {
  rowData: User;
  callAfarResources?: CallAfarResources;
}
export const RowActions = ({ rowData, callAfarResources }: RowActionsProps) => {
  const { pushModal } = useModal();

  const handleDelete = () => {
    pushModal(
      'Confirmation',
      {
        useProps: () => {
          const { removeOneAdminUser } = useRemoveOneAdminUser();
          const { onClose } = useModal();
          const { onCallAfar } = useCallFromAfar();
          return {
            content: (
              <div>
                <span>Seguro que desea eliminar este usuario?</span>
              </div>
            ),
            badge: <Badge variant="error" />,
            primaryBtn: (
              <ButtonRemove
                isBusy={removeOneAdminUser.status.isBusy}
                onClick={() =>
                  removeOneAdminUser.fetch(
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

  return (
    <RowActionsContainer>
      <IconButtonRemove onClick={handleDelete} />
    </RowActionsContainer>
  );
};
