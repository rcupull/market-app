import { useEffect } from 'react';

import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useGetAllShoppingAdmin } from 'features/api/admin/useGetAllShoppingAdmin';
import { useGetAllBusinessSummary } from 'features/api/business/useGetAllBusinessSummary';

import { useFiltersVolatile } from 'hooks/useFiltersVolatile';

import { Filters } from './Filters';
import { RowActions } from './RowActions';

import { TopActions } from 'pages/@common/top-actions';
import { GetAllShoppingAdminQuery } from 'types/api';
import { BusinessSummary } from 'types/business';
import { Shopping } from 'types/shopping';
import { getDateString } from 'utils/date';
import { cn } from 'utils/general';
import { getShoppingData } from 'utils/shopping';

export const PurchaseOrders = () => {
  const { getAllShoppingAdmin } = useGetAllShoppingAdmin();
  const { getAllBusinessSummary } = useGetAllBusinessSummary();

  const filters = useFiltersVolatile<GetAllShoppingAdminQuery>({
    onChange: (filters) => {
      getAllShoppingAdmin.fetch(filters);
    },
  });

  const onRefreshForce = () => {
    filters.onMergeFilters({ page: 1 }, { forceFetch: true });
  };

  useEffect(() => {
    onRefreshForce();
    getAllBusinessSummary.fetch({ pagination: false });
  }, []);

  const getBusinessSummary = (routeName: string): BusinessSummary | undefined => {
    return getAllBusinessSummary.data?.find((sum) => sum.routeName === routeName);
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
          isBusy={getAllShoppingAdmin.status.isBusy}
        />
      </TopActions>
      <Table<Shopping>
        remapRowsIndex={{
          xs: [[0, 1, 2, 3, 4]],
          md: [[0], [1, 2], [3, 4]],
          lg: 'none',
        }}
        heads={[
          'Acciones',
          'Negocio/RouteName',
          'Cliente',
          'Estado',
          'Unidades',
          'Precio total',
          'Fecha de creación',
        ]}
        getRowProps={(rowData) => {
          const { createdAt, purchaserName, state, routeName } = rowData;

          const { totalPrice, totalProducts } = getShoppingData(rowData);

          const { name } = getBusinessSummary(routeName) || {};
          return {
            nodes: [
              <RowActions key="RowActions" rowData={rowData} />,
              <span key="routeName" className={cn('text-nowrap', { 'text-red-500': !name })}>
                {name || 'unknown'}
                {' / '}
                {routeName}
              </span>,
              purchaserName,
              state,
              totalProducts,
              <span key="price" className="text-nowrap">{`${totalPrice} CUP`}</span>,
              getDateString({ date: createdAt, showTime: true }),
            ],
          };
        }}
        data={getAllShoppingAdmin.data}
        isBusy={getAllShoppingAdmin.status.isBusy}
      />
    </>
  );
};

export default PurchaseOrders;
