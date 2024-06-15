import { Badge } from 'components/badge';
import { Button } from 'components/button';
import { IconButtonDetails } from 'components/icon-button-details';
import { IconButtonRemove } from 'components/icon-button-remove';

import { useRemoveManyShoppingFromBillAdmin } from 'features/api/admin/useRemoveManyShoppingFromBillAdmin';
import { useModal } from 'features/modal/useModal';

import { RowActionsContainer } from 'pages/@common/row-actions-container';
import { useShoppingDetailsModal } from 'pages/@modals/useShoppingDetailsModal';
import { Shopping } from 'types/shopping';

export interface RowActionsProps {
  rowData: Shopping;
  onRefresh: () => void;
}
export const RowActions = ({ rowData, onRefresh }: RowActionsProps) => {
  const { billData } = rowData;
  const { pushModal } = useModal();
  const shoppingDetailsModal = useShoppingDetailsModal();

  return (
    <RowActionsContainer>
      <IconButtonDetails onClick={() => shoppingDetailsModal.open({ shopping: rowData })} />
      {billData?.state === 'PENDING_TO_PAY' && (
        <IconButtonRemove
          stopPropagation
          title="Eliminar de la factura"
          onClick={() => {
            pushModal(
              'Confirmation',
              {
                useProps: () => {
                  const { onClose } = useModal();
                  const { removeManyShoppingFromBillAdmin } = useRemoveManyShoppingFromBillAdmin();

                  return {
                    content: '¿Seguro que desea quitar esta orden de compra de la factura?',
                    badge: <Badge variant="error" />,
                    primaryBtn: (
                      <Button
                        label="Eliminar de la factura"
                        isBusy={removeManyShoppingFromBillAdmin.status.isBusy}
                        onClick={() => {
                          removeManyShoppingFromBillAdmin.fetch(
                            { billId: billData._id, shoppingIds: [rowData._id] },
                            {
                              onAfterSuccess: () => {
                                onClose();
                                onRefresh();
                              },
                            },
                          );
                        }}
                      />
                    ),
                  };
                },
              },
              { emergent: true },
            );
          }}
        />
      )}
    </RowActionsContainer>
  );
};
