import { RowActionsContainer } from 'pages/@common/row-actions-container';
import { Bill } from 'types/billing';

export interface RowActionsProps {
  rowData: Bill;
}
export const RowActions = ({ rowData }: RowActionsProps) => {
  return <RowActionsContainer>{`some action with ${rowData.totalDebit}`}</RowActionsContainer>;
};
