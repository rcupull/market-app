import { useEffect } from 'react';

import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useGetShoppingOwner } from 'features/api/shopping-owner/useGetShoppingOwner';

import { RowActions } from './RowActions';

import { TopActions } from 'pages/@common/top-actions';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { Shopping } from 'types/shopping';
import { getDateString } from 'utils/date';

export const PurchaseOrders = () => {
  const { getShoppingOwner } = useGetShoppingOwner();
  const { business } = useBusiness();

  const onRefresh = () => business && getShoppingOwner.fetch({ routeName: business.routeName });

  useEffect(() => {
    onRefresh();
  }, [business]);

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
