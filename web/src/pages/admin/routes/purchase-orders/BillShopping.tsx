import { Badge } from 'components/badge';
import { Button } from 'components/button';

import { useRemoveManyShoppingFromBillAdmin } from 'features/api/admin/useRemoveManyShoppingFromBillAdmin';
import { useModal } from 'features/modal/useModal';

import { Shopping } from 'types/shopping';

export interface BillShoppingProps {
  rowData: Shopping;
  onRefresh: () => void;
}

export const BillShopping = ({ rowData, onRefresh }: BillShoppingProps) => {
  const { billId, billState } = rowData;
  const { pushModal } = useModal();

  const handleRemoveFromBill = () => {
    if (!billId) return;

    pushModal('Confirmation', {
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
                  { billId, shoppingIds: [rowData._id] },
                  {
                    onAfterSuccess: () => {
                      onClose();
                      onRefresh();
                    }
                  }
                );
              }}
            />
          )
        };
      }
    });
  };

  return (
    <>
      {billState ? billState : 'No facturado'}
      {billState === 'PENDING_TO_PAY' && (
        <Button
          variant="link"
          className="text-red-600"
          label="Eliminar de la factura"
          title="Eliminar de la factura"
          onClick={handleRemoveFromBill}
        />
      )}
    </>
  );
};
