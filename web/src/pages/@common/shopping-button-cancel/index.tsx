import { Badge } from 'components/badge';
import { ButtonClose } from 'components/button-close';
import { ButtonRemove } from 'components/button-remove';

import { useShoppingChangeState } from 'features/api/shopping/useShoppingChangeState';
import { useModal } from 'features/modal/useModal';

import { StyleProps } from 'types/general';
import { Shopping, ShoppingState } from 'types/shopping';

export interface ShoppingButtonCancelProps extends StyleProps {
  shopping: Shopping;
  onAfterSucess?: () => void;
}

export const ShoppingButtonCancel = ({ shopping, onAfterSucess }: ShoppingButtonCancelProps) => {
  const { pushModal } = useModal();

  const handleCancel = () => {
    pushModal('Confirmation', {
      useProps: () => {
        const { onClose } = useModal();

        const { shoppingChangeState } = useShoppingChangeState();

        return {
          content: (
            <div>
              Este proceso es irreversible y perderá los productos que fueron reservados por usted.
              <span className="font-bold"> Seguro que desea cancelar esta orden de compra?</span>
            </div>
          ),
          badge: <Badge variant="warning" />,
          primaryBtn: (
            <ButtonRemove
              label="Cancelar orden"
              isBusy={shoppingChangeState.status.isBusy}
              onClick={() => {
                shoppingChangeState.fetch(
                  { state: ShoppingState.CANCELED, shoppingId: shopping._id },
                  {
                    onAfterSuccess: () => {
                      onClose();
                      onAfterSucess?.();
                    },
                  }
                );
              }}
            />
          ),
          secondaryBtn: <ButtonClose />,
        };
      },
    });
  };
  return (
    <ButtonRemove
      label="Cancelar orden"
      title="Cancelar orden de compra"
      stopPropagation
      onClick={handleCancel}
      className="!py-0"
    />
  );
};
