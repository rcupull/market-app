import { useEffect } from 'react';

import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useGetAllBills } from 'features/api/billing/useGetAllBills';

import { useFiltersVolatile } from 'hooks/useFiltersVolatile';

import { Filters } from './Filters';

import { TopActions } from 'pages/@common/top-actions';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { GetAllBillsQuery } from 'types/api';
import { Bill } from 'types/billing';
import { getDateString } from 'utils/date';

export const Billing = () => {
  const { getAllBills } = useGetAllBills();
  const { business } = useBusiness();

  const filters = useFiltersVolatile<Omit<GetAllBillsQuery, 'routeName'>>({
    onChange: (filters) => {
      business &&
        getAllBills.fetch({
          routeName: business.routeName,
          ...filters,
        });
    },
  });

  useEffect(() => {
    filters.onRefresh();
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
          isBusy={getAllBills.status.isBusy}
        />
      </TopActions>

      <Table<Bill>
        remapRowsIndex={{
          xs: [[0, 1, 2]],
          lg: 'none',
        }}
        heads={['Estado', 'Débito Total', 'Fecha']}
        getRowProps={(rowData) => {
          const { createdAt, state, totalDebit } = rowData;

          return {
            nodes: [
              state,
              <span key="price" className="text-nowrap">{`${totalDebit} CUP`}</span>,
              getDateString({ date: createdAt, showTime: true }),
            ],
          };
        }}
        data={getAllBills.data}
        isBusy={getAllBills.status.isBusy}
      />
    </>
  );
};
