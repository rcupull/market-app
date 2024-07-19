import { useEffect } from 'react';

import { ButtonRefresh } from 'components/button-refresh';
import { IconButtonRefresh } from 'components/icon-button-refresh';
import { Table } from 'components/table';

import { useGetShoppingOwner } from 'features/api/shopping-owner/useGetShoppingOwner';

import { useFiltersVolatile } from 'hooks/useFiltersVolatile';
import { useRouter } from 'hooks/useRouter';

import { ClientData } from './ClientData';
import { Filters } from './Filters';
import { RowActions } from './RowActions';
import { ShoppingDetails } from './ShoppingDetails';

import { ShoppingStateView } from 'pages/@common/shoping-state-view';
import { ShoppingButtonStateHistory } from 'pages/@common/shopping-button-state-history';
import { TopActions } from 'pages/@common/top-actions';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { GetAllShoppingQuery } from 'types/api';
import { Shopping, ShoppingState } from 'types/shopping';

export const ShoppingPage = () => {
  const { getShoppingOwner } = useGetShoppingOwner();
  const { business, onFetch } = useBusiness();

  const { onChangeQuery, query } = useRouter<{ state?: ShoppingState }>();

  const filters = useFiltersVolatile<Omit<GetAllShoppingQuery, 'routeName'>>({
    onChange: (filters) => {
      if (!business) return;

      if (filters.states) {
        onChangeQuery({ state: filters.states[0] });
      }

      getShoppingOwner.fetch({
        routeName: business.routeName,
        ...filters,
      });
    },
  });

  useEffect(() => {
    filters.onMergeFilters({ states: [query.state || ShoppingState.REQUESTED] });
  }, [business?.routeName]);

  const onRefreshForce = () => {
    filters.onMergeFilters({ page: 1 }, { forceFetch: true });
  };

  const refreshButton = (
    <>
      <ButtonRefresh
        onClick={onRefreshForce}
        className="ml-auto hidden sm:block"
        isBusy={getShoppingOwner.status.isBusy}
      />
      <IconButtonRefresh
        onClick={onRefreshForce}
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
          xs: [[0, 1, 2, 3]],
          sm: [[0, 1], [2, 3]],
          lg: 'none',
        }}
        heads={['Acciones', 'Cliente', 'Estado', 'Detalles']}
        getRowProps={(rowData) => {
          return {
            nodes: [
              <RowActions key="RowActions" rowData={rowData} />,
              <ClientData key="ClientData" rowData={rowData} />,
              <div key="ShoppingState" className="flex items-center">
                <ShoppingStateView
                  shopping={rowData}
                  fetchStatus={getShoppingOwner.status}
                  onAfterSuccess={() => {
                    onRefreshForce();
                    business && onFetch({ routeName: business.routeName });
                  }}
                />
                <ShoppingButtonStateHistory shopping={rowData} />
              </div>,
              <ShoppingDetails key="ShoppingDetails" rowData={rowData} business={business} />,
            ],
          };
        }}
        data={getShoppingOwner.data}
        isBusy={getShoppingOwner.status.isBusy}
      />
    </>
  );
};
