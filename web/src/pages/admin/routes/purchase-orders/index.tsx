import { useEffect } from 'react';

import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useGetAllShoppingAdmin } from 'features/api/admin/useGetAllShoppingAdmin';
import { useGetAllBusinessSummary } from 'features/api/business/useGetAllBusinessSummary';

import { useFiltersVolatile } from 'hooks/useFiltersVolatile';

import { BillShopping } from './BillShopping';
import { BulkActionsShopping } from './BulkActionsShopping';
import { Filters } from './Filters';
import { RowActions } from './RowActions';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { ShoppingButtonStateHistory } from 'pages/@common/shopping-button-state-history';
import { ShoppingStateLabel } from 'pages/@common/shopping-state-label';
import { TopActions } from 'pages/@common/top-actions';
import { useInfiniteScrolling } from 'pages/@hooks/useInfiniteScrolling';
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

  const infiniteScrolling = useInfiniteScrolling({
    fetchPaginatedResources: getAllShoppingAdmin,
    onFetch: ({ page }) => filters.onMergeFilters({ page }),
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
    <LayoutPageSection title="Órdenes de compra">
      <BulkActionsShopping
        onRefresh={() => filters.onMergeFilters({ page: 1 }, { forceFetch: true })}
        filters={filters.value}
      >
        {({ getDisabledOverlay, bulkActionNode, selectAllNode, tablePropsProcessor }) => {
          return (
            <>
              <div className="flex justify-end">
                <TopActions className="!w-fit">
                  {getDisabledOverlay(
                    <ButtonRefresh
                      onClick={() => onRefreshForce()}
                      isBusy={getAllShoppingAdmin.status.isBusy}
                    />
                  )}

                  {bulkActionNode}
                </TopActions>
              </div>

              {getDisabledOverlay(
                <TopActions>
                  <Filters
                    onChange={(filtersValue) => filters.onMergeFilters(filtersValue)}
                    value={filters.value}
                  />
                </TopActions>
              )}

              <div className="mb-2 flex justify-center">{selectAllNode}</div>

              <Table<Shopping>
                propsPreprocessors={[tablePropsProcessor]}
                remapRowsIndex={{
                  xs: [[0, 1, 2, 3, 4, 5, 6, 7]],
                  lg: [
                    [0, 1, 2, 3],
                    [4, 5, 6, 7],
                  ],
                  xl: 'none',
                }}
                heads={[
                  'Acciones',
                  <span key="headBusiness">
                    Negocio <br /> <span className="text-gray-400">RouteName</span>
                  </span>,
                  'Cliente',
                  'Estado',
                  'Unidades',
                  'Precio total',
                  'Facturación',
                  'Fecha de creación',
                ]}
                getRowProps={(rowData) => {
                  const { createdAt, purchaserName, state, routeName } = rowData;

                  const { totalPrice, totalProducts } = getShoppingData(rowData);

                  const { name } = getBusinessSummary(routeName) || {};
                  return {
                    nodes: [
                      <RowActions key="RowActions" rowData={rowData} onRefresh={onRefreshForce} />,
                      <div
                        key="routeName"
                        className={cn('text-nowrap flex flex-col', { 'text-red-500': !name })}
                      >
                        <span>{name || 'unknown'}</span>
                        <span className="text-gray-400">{routeName}</span>
                      </div>,
                      purchaserName,
                      <div key="state" className="flex items-center">
                        <ShoppingStateLabel state={state} className="text-nowrap" />
                        <ShoppingButtonStateHistory shopping={rowData} />
                      </div>,
                      totalProducts,
                      <span key="price" className="text-nowrap">{`${totalPrice} CUP`}</span>,
                      <BillShopping
                        key="BillShopping"
                        rowData={rowData}
                        onRefresh={onRefreshForce}
                      />,
                      getDateString({ date: createdAt, showTime: true }),
                    ],
                  };
                }}
                data={infiniteScrolling.data}
                onScrollBottom={infiniteScrolling.onScrollBottom}
                isBusyBottom={infiniteScrolling.status.isBusy}
              />
            </>
          );
        }}
      </BulkActionsShopping>
    </LayoutPageSection>
  );
};

export default PurchaseOrders;
