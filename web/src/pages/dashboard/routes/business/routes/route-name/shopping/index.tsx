import { useEffect } from 'react';

import { ButtonRefresh } from 'components/button-refresh';
import { IconButtonRefresh } from 'components/icon-button-refresh';
import { Table } from 'components/table';

import { useGetShoppingOwner } from 'features/api/shopping-owner/useGetShoppingOwner';

import { useFiltersVolatile } from 'hooks/useFiltersVolatile';

import { Filters } from './Filters';
import { RowActions } from './RowActions';

import { ShoppingStateView } from 'pages/@common/shoping-state-view';
import { ShoppingButtonStateHistory } from 'pages/@common/shopping-button-state-history';
import { TopActions } from 'pages/@common/top-actions';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { GetAllShoppingQuery } from 'types/api';
import { Shopping } from 'types/shopping';
import { getDateString } from 'utils/date';
import { getShoppingData } from 'utils/shopping';

export const ShoppingPage = () => {
  const { getShoppingOwner } = useGetShoppingOwner();
  const { business, onFetch } = useBusiness();

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

  const refreshButton = (
    <>
      <ButtonRefresh
        onClick={() => onRefreshForce()}
        className="ml-auto hidden sm:block"
        isBusy={getShoppingOwner.status.isBusy}
      />
      <IconButtonRefresh
        onClick={() => onRefreshForce()}
        className="ml-auto sm:hidden"
        isBusy={getShoppingOwner.status.isBusy}
      />
    </>
  );
  return (
    <>
      <TopActions>{refreshButton}</TopActions>

      <Filters
        onChange={(filtersValue) => filters.onMergeFilters(filtersValue)}
        value={filters.value}
      />

      <Table<Shopping>
        remapRowsIndex={{
          xs: [[0, 1, 2, 3, 4, 5]],
          lg: [
            [0, 1, 2],
            [3, 4, 5],
          ],
          xl: 'none',
        }}
        heads={['Acciones', 'Cliente', 'Estado', 'Unidades', 'Precio total', 'Fecha de creación']}
        getRowProps={(rowData) => {
          const { createdAt, purchaserName } = rowData;

          const { totalPrice, totalProducts } = getShoppingData(rowData);

          return {
            nodes: [
              <RowActions key="RowActions" rowData={rowData} />,
              purchaserName,
              <div key="ShoppingState" className="flex items-center">
                <ShoppingStateView
                  shopping={rowData}
                  fetchStatus={getShoppingOwner.status}
                  onAfterSuccess={() => {
                    onRefreshForce();
                    business && onFetch({routeName: business.routeName})
                  }}
                />
                <ShoppingButtonStateHistory shopping={rowData} />
              </div>,
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
