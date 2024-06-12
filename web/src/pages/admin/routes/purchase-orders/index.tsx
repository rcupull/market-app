import { useEffect } from 'react';

import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useGetAllShoppingAdmin } from 'features/api/admin/useGetAllShoppingAdmin';

import { useFiltersVolatile } from 'hooks/useFiltersVolatile';

import { Filters } from './Filters';
import { RowActions } from './RowActions';

import { TopActions } from 'pages/@common/top-actions';
import { GetAllShoppingAdminQuery } from 'types/api';
import { Shopping } from 'types/shopping';
import { getDateString } from 'utils/date';
import { getShoppingData } from 'utils/shopping';

export const PurchaseOrders = () => {
  const { getAllShoppingAdmin } = useGetAllShoppingAdmin();

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
  }, []);

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
        heads={['Acciones', 'Cliente', 'Estado', 'Unidades', 'Precio total', 'Fecha de creación']}
        getRowProps={(rowData) => {
          const { createdAt, purchaserName, state } = rowData;

          const { totalPrice, totalProducts } = getShoppingData(rowData);

          return {
            nodes: [
              <RowActions key="RowActions" rowData={rowData} />,
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
