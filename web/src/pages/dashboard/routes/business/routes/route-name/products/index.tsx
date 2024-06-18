import { useEffect } from 'react';

import { ButtonNew } from 'components/button-new';
import { ButtonRefresh } from 'components/button-refresh';
import { Divider } from 'components/divider';
import { IconButton } from 'components/icon-button';
import { Table } from 'components/table';

import { useGetAllPosts } from 'features/api/posts/useGetAllPosts';

import { useFiltersVolatile } from 'hooks/useFiltersVolatile';

import { BulkActions } from './BulkActions';
import { Filters } from './Filters';
import { PostAmount } from './PostAmount';
import { RowActions } from './RowActions';
import { useInfinityScrolling } from './useInfinityScrolling';

import SvgPlusSolid from 'icons/PlusSolid';
import SvgSyncSolid from 'icons/SyncSolid';
import { TopActions } from 'pages/@common/top-actions';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useTableCellCategoriesTags } from 'pages/@hooks/useTableCellCategoriesTags';
import { useBusinessNewUpdatePost } from 'pages/@modals/useBusinessNewUpdatePost';
import { GetAllPostsQuery } from 'types/api';
import { getImageEndpoint } from 'utils/api';
import { getDateString } from 'utils/date';
import { cn, isNumber } from 'utils/general';
import { viewUtils } from 'utils/view';

export const Products = () => {
  const { getAllPosts } = useGetAllPosts();
  const businessNewUpdatePost = useBusinessNewUpdatePost();
  const { business } = useBusiness();

  const infinityScrolling = useInfinityScrolling({
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
      <IconButton
        title="Nuevo producto"
        svg={SvgPlusSolid}
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
      <IconButton
        title="Actualizar"
        svg={SvgSyncSolid}
        onClick={filters.onRefresh}
        isBusy={getAllPosts.status.isBusy}
        className="block sm:hidden"
      />
    </>
  );

  return (
    <div className="h-full flex flex-col">
      <BulkActions
        business={business}
        onRefresh={() => filters.onMergeFilters({ page: 1 }, { forceFetch: true })}
        filters={filters.value}
      >
        {({ getBulkHeaderNodes, getBulkRowNodes, getBulkTopActionsNode }) => (
          <>
            {getBulkTopActionsNode(
              <TopActions>
                {buttonNew}
                {buttonRefresh}
              </TopActions>,
            )}

            <Divider className="!my-3" />

            <Filters
              business={business}
              onChange={(filtersValue) => filters.onMergeFilters(filtersValue)}
              value={filters.value}
            />

            <Divider className="!my-3" />

            <Table
              className="!max-h-[calc(100vh-25rem)]"
              remapRowsIndex={{
                xs: [[0, 1, 2, 3, 4, 5]],
                lg: 'none',
              }}
              heads={getBulkHeaderNodes([
                'Acciones',
                'Nombre',
                'Categorías',
                'Imágen',
                'Fecha de Creación',
                'Detalles',
              ])}
              getRowProps={(rowData) => {
                const {
                  _id: postId,
                  name,
                  createdAt,
                  currency,
                  price,
                  postCategoriesTags,
                  hidden,
                  images,
                  stockAmount,
                } = rowData;

                const mainImage = images?.[0];

                return {
                  className: cn({
                    'bg-gray-100': hidden,
                  }),
                  nodes: getBulkRowNodes({ rowData }, [
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
                    viewUtils.keyValueList([
                      {
                        label: (
                          <span
                            className={cn({
                              'text-red-500': hidden,
                            })}
                          >{`${hidden ? 'Oculta' : 'Visible'}`}</span>
                        ),
                        value: null,
                      },
                      {
                        label: 'Precio',
                        value: `${price} ${currency}`,
                      },
                      {
                        label: (
                          <span
                            className={cn({
                              'text-red-500': stockAmount === 0,
                            })}
                          >
                            Stock
                          </span>
                        ),
                        value: isNumber(stockAmount) ? (
                          <PostAmount
                            value={stockAmount}
                            postId={postId}
                            onAfterSuccess={filters.onRefresh}
                            className={cn({
                              'border-2 rounded-lg border-red-500': stockAmount === 0,
                            })}
                          />
                        ) : (
                          <span className="text-red-500">Desabilitado</span>
                        ),
                      },
                    ]),
                  ]),
                };
              }}
              data={infinityScrolling.tableData}
              onScrollBottom={infinityScrolling.onScrollBottom}
              isBusy={getAllPosts.status.isBusy}
            />
          </>
        )}
      </BulkActions>
    </div>
  );
};
