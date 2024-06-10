import { IconButtonDetails } from 'components/icon-button-details';

import { RowActionsContainer } from 'pages/@common/row-actions-container';
import { useShoppingDetailsModal } from 'pages/@modals/useShoppingDetailsModal';
import { Shopping } from 'types/shopping';

export interface RowActionsProps {
  rowData: Shopping;
}
export const RowActions = ({ rowData }: RowActionsProps) => {
  const shoppingDetailsModal = useShoppingDetailsModal();

  return (
    <RowActionsContainer>
      <IconButtonDetails onClick={() => shoppingDetailsModal.open({ shopping: rowData })} />
    </RowActionsContainer>
  );
};
