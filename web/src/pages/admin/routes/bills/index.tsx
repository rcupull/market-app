import { useEffect } from 'react';

import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useGetAllBillsAdmin } from 'features/api/admin/useGetAllBillsAdmin';

import { useFiltersVolatile } from 'hooks/useFiltersVolatile';

import { Filters } from './Filters';
import { RowActions } from './RowActions';

import { TopActions } from 'pages/@common/top-actions';
import { GetAllBillAdminQuery } from 'types/api';
import { Bill } from 'types/billing';
import { getDateString } from 'utils/date';

export const Bills = () => {
  const { getAllBillsAdmin } = useGetAllBillsAdmin();

  const filters = useFiltersVolatile<GetAllBillAdminQuery>({
    onChange: (filters) => {
      getAllBillsAdmin.fetch(filters);
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
          isBusy={getAllBillsAdmin.status.isBusy}
        />
      </TopActions>

      <Table<Bill>
        remapRowsIndex={{
          xs: [[0, 1, 2, 3, 4]],
          lg: [[0], [1, 2], [3, 4]],
          xl: 'none',
        }}
        heads={['Acciones', 'RouteName', 'Estado', 'Débito total', 'Fecha de creación']}
        getRowProps={(rowData) => {
          const { createdAt, state, routeName, totalDebit } = rowData;

          return {
            nodes: [
              <RowActions key="RowActions" rowData={rowData} onRefresh={onRefreshForce} />,
              routeName,
              state,
              <span key="price" className="text-nowrap">{`${totalDebit} CUP`}</span>,
              getDateString({ date: createdAt, showTime: true }),
            ],
          };
        }}
        data={getAllBillsAdmin.data}
        isBusy={getAllBillsAdmin.status.isBusy}
      />
    </>
  );
};

export default Bills;
