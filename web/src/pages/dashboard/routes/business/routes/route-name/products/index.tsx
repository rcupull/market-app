import { useEffect } from 'react';

import { ButtonNew } from 'components/button-new';
import { ButtonRefresh } from 'components/button-refresh';
import { IconButtonAdd } from 'components/icon-button-add';
import { IconButtonRefresh } from 'components/icon-button-refresh';
import { Table } from 'components/table';

import { useGetAllPosts } from 'features/api/posts/useGetAllPosts';

import { useFiltersVolatile } from 'hooks/useFiltersVolatile';

import { BulkActionsProducts } from './BulkActionsProducts';
import { Filters } from './Filters';
import { ProductDetails } from './ProductDetails';
import { RowActions } from './RowActions';

import { TopActions } from 'pages/@common/top-actions';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useInfiniteScrolling } from 'pages/@hooks/useInfiniteScrolling';
import { useTableCellCategoriesTags } from 'pages/@hooks/useTableCellCategoriesTags';
import { useBusinessNewUpdatePost } from 'pages/@modals/useBusinessNewUpdatePost';
import { GetAllPostsQuery } from 'types/api';
import { getImageEndpoint } from 'utils/api';
import { getDateString } from 'utils/date';
import { cn } from 'utils/general';

export const Products = () => {
  const { getAllPosts } = useGetAllPosts();
  const businessNewUpdatePost = useBusinessNewUpdatePost();
  const { business } = useBusiness();

  const infiniteScrolling = useInfiniteScrolling({
    fetchPaginatedResources: getAllPosts,
    onFetch: ({ page }) => filters.onMergeFilters({ page }),
  });

  const filters = useFiltersVolatile<GetAllPostsQuery>({
    onChange: (filters) => {
      business &&
        getAllPosts.fetch({
          postType: 'product',
          includeHidden: true,
          routeNames: [business.routeName],
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

  const tableCellCategoriesTags = useTableCellCategoriesTags({
    business,
  });

  const buttonNew = (
    <>
      <ButtonNew
        label="Nuevo producto"
        onClick={() => {
          businessNewUpdatePost.open({
            postType: 'product',
            onAfterSuccess: () => onRefreshForce(),
          });
        }}
        className="ml-auto hidden sm:block"
      />
      <IconButtonAdd
        title="Nuevo producto"
        onClick={() => {
          businessNewUpdatePost.open({
            postType: 'product',
            onAfterSuccess: () => onRefreshForce(),
          });
        }}
        variant="primary"
        className="ml-auto block sm:hidden"
      />
    </>
  );

  const buttonRefresh = (
    <>
      <ButtonRefresh
        onClick={filters.onRefresh}
        isBusy={getAllPosts.status.isBusy}
        className="hidden sm:block"
      />
      <IconButtonRefresh
        onClick={filters.onRefresh}
        isBusy={getAllPosts.status.isBusy}
        className="block sm:hidden"
      />
    </>
  );

  return (
    <div className="h-full flex flex-col">
      <BulkActionsProducts
        business={business}
        onRefresh={() => filters.onMergeFilters({ page: 1 }, { forceFetch: true })}
        filters={filters.value}
      >
        {({ getDisabledOverlay, tablePropsProcessor, bulkActionNode, selectAllNode }) => (
          <>
            <div className="flex items-center justify-between mb-1">
              {bulkActionNode}
              {getDisabledOverlay(
                <TopActions>
                  {buttonNew}
                  {buttonRefresh}
                </TopActions>
              )}
            </div>

            <Filters
              business={business}
              onChange={(filtersValue) => filters.onMergeFilters(filtersValue)}
              value={filters.value}
            />

            <div className="my-2 flex justify-center">{selectAllNode}</div>

            <Table
              className="!max-h-[calc(100vh-25rem)]"
              propsPreprocessors={[tablePropsProcessor]}
              remapRowsIndex={{
                xs: [[0, 1, 2, 3, 4, 5]],
                lg: 'none',
              }}
              heads={[
                'Acciones',
                'Nombre',
                'Categorías',
                'Imágen',
                'Fecha de Creación',
                'Detalles',
              ]}
              getRowProps={(rowData) => {
                const { name, createdAt, postCategoriesTags, hidden, images } = rowData;

                const mainImage = images?.[0];

                return {
                  className: cn({
                    'bg-gray-100': hidden,
                  }),
                  nodes: [
                    <RowActions
                      key="RowActions"
                      rowData={rowData}
                      onRefreshForce={onRefreshForce}
                    />,
                    name,
                    tableCellCategoriesTags.onGetTableCellNode({ postCategoriesTags }),
                    mainImage ? (
                      <img
                        src={getImageEndpoint(mainImage.src)}
                        className="object-contain w-10 h-10"
                      />
                    ) : (
                      'ninguna'
                    ),
                    getDateString({ date: createdAt, showTime: true }),
                    <ProductDetails
                      key="ProductDetails"
                      rowData={rowData}
                      business={business}
                      onRefresh={filters.onRefresh}
                    />,
                  ],
                };
              }}
              data={infiniteScrolling.data}
              onScrollBottom={infiniteScrolling.onScrollBottom}
              isBusyBottom={infiniteScrolling.status.isBusy}
            />
          </>
        )}
      </BulkActionsProducts>
    </div>
  );
};
