import { useEffect } from 'react';

import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useGetShoppingOwner } from 'features/api/shopping-owner/useGetShoppingOwner';

import { RowActions } from './RowActions';

import { TopActions } from 'pages/@common/top-actions';
import { Shopping } from 'types/shopping';
import { getDateString } from 'utils/date';

export interface PurchaseOrdersProps {
  routeName: string;
}

export const PurchaseOrders = ({ routeName }: PurchaseOrdersProps) => {
  const { getShoppingOwner } = useGetShoppingOwner();

  const onRefresh = () => getShoppingOwner.fetch({ routeName });

  useEffect(() => {
    onRefresh();
  }, [routeName]);

  return (
    <>
      <TopActions>
        <ButtonRefresh
          onClick={() => onRefresh()}
          className="ml-auto"
          isBusy={getShoppingOwner.status.isBusy}
        />
      </TopActions>
      <Table<Shopping>
        heads={[null, 'User', 'Estado', 'Fecha de creación']}
        getRowProps={(rowData) => {
          const { state, createdAt, purchaserName } = rowData;

          return {
            nodes: [
              <RowActions key="RowActions" rowData={rowData} />,
              purchaserName,
              state,
              getDateString({ date: createdAt, showTime: true }),
            ],
          };
        }}
        data={getShoppingOwner.data}
        isBusy={getShoppingOwner.status.isBusy}
      />
    </>
  );
};
