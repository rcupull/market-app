import { useEffect } from 'react';

import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useGetShoppingOwner } from 'features/api/shopping-owner/useGetShoppingOwner';

import { useFiltersVolatile } from 'hooks/useFiltersVolatile';

import { Filters } from './Filters';
import { RowActions } from './RowActions';

import { ShoppingStateView } from 'pages/@common/shoping-state-view';
import { TopActions } from 'pages/@common/top-actions';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { GetAllShoppingQuery } from 'types/api';
import { Shopping } from 'types/shopping';
import { getDateString } from 'utils/date';
import { getShoppingData } from 'utils/shopping';

export const PurchaseOrders = () => {
  const { getShoppingOwner } = useGetShoppingOwner();
  const { business } = useBusiness();

  const filters = useFiltersVolatile<Omit<GetAllShoppingQuery, 'routeName'>>({
    onChange: (filters) => {
      business &&
        getShoppingOwner.fetch({
          routeName: business.routeName,
          ...filters,
        });
    },
  });
  useEffect(() => {
    filters.onMergeFilters({ states: ['REQUESTED'] });
  }, [business?.routeName]);

  const onRefreshForce = () => {
    filters.onMergeFilters({ page: 1 }, { forceFetch: true });
  };

  return (
    <>
      <TopActions>
        <Filters
          onChange={(filtersValue) => filters.onMergeFilters(filtersValue)}
          value={filters.value}
        />

        <ButtonRefresh
          onClick={() => onRefreshForce()}
          className="ml-auto"
          isBusy={getShoppingOwner.status.isBusy}
        />
      </TopActions>
      <Table<Shopping>
        remapRowsIndex={{
          xs: [[0, 1, 2, 3, 4]],
          md: [[0], [1, 2], [3, 4]],
          lg: 'none',
        }}
        heads={['Acciones', 'Cliente', 'Estado', 'Unidades', 'Precio total', 'Fecha de creación']}
        getRowProps={(rowData) => {
          const { createdAt, purchaserName } = rowData;

          const { totalPrice, totalProducts } = getShoppingData(rowData);

          return {
            nodes: [
              <RowActions key="RowActions" rowData={rowData} />,
              purchaserName,
              <ShoppingStateView
                key="ShoppingState"
                shopping={rowData}
                fetchStatus={getShoppingOwner.status}
                onAfterSuccess={() => onRefreshForce()}
              />,
              totalProducts,
              <span key="price" className="text-nowrap">{`${totalPrice} CUP`}</span>,
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
