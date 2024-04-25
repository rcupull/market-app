import { useEffect } from 'react';

import { ButtonNew } from 'components/button-new';
import { ButtonRefresh } from 'components/button-refresh';
import { Divider } from 'components/divider';
import { Table } from 'components/table';

import { useGetAllPosts } from 'features/api/posts/useGetAllPosts';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';
import { useModal } from 'features/modal/useModal';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useFiltersVolatile } from 'hooks/useFiltersVolatile';

import { BulkActions } from './BulkActions';
import { Filters } from './Filters';
import { PostAmount } from './PostAmount';
import { RowActions } from './RowActions';
import { useInfinityScrolling } from './useInfinityScrolling';

import { TopActions } from 'pages/@common/top-actions';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useTableCellCategoriesTags } from 'pages/@hooks/useTableCellCategoriesTags';
import { GetAllPostsQuery } from 'types/api';
import { getImageEndpoint } from 'utils/api';
import { getDateString } from 'utils/date';
import { cn, isNumber } from 'utils/general';
import { viewUtils } from 'utils/view';

export interface PostsProps {
  routeName: string;
}

export const Posts = ({ routeName }: PostsProps) => {
  const { getAllPosts } = useGetAllPosts();
  const { pushModal } = useModal();

  const businessOwnerData = useBusiness();

  const infinityScrolling = useInfinityScrolling({
    fetchPaginatedResources: getAllPosts,
    onFetch: ({ page }) => filters.onMergeFilters({ page }),
  });

  const filters = useFiltersVolatile<GetAllPostsQuery>({
    onChange: (filters) =>
      getAllPosts.fetch({ includeHidden: true, routeNames: [routeName], ...filters }),
  });

  useEffect(() => {
    filters.onRefresh();
  }, []);

  const { isNotValidPostsCountByBussines } = useGetUserPaymentPlan();

  const callAfarResources = 'dashboard_business_route-name_posts_onRefresh';
  useCallFromAfar(callAfarResources, () => {
    filters.onMergeFilters({ page: 1 }, { forceFetch: true });
  });

  const tableCellCategoriesTags = useTableCellCategoriesTags({
    business: businessOwnerData.business,
  });

  return (
    <div className="h-full flex flex-col">
      <BulkActions
        business={businessOwnerData.business}
        onRefresh={() => filters.onMergeFilters({ page: 1 }, { forceFetch: true })}
        filters={filters.value}
      >
        {({ getBulkHeaderNodes, getBulkRowNodes, getBulkTopActionsNode }) => (
          <>
            {getBulkTopActionsNode(
              <TopActions>
                <ButtonNew
                  label="Nueva publicación"
                  needPremium={isNotValidPostsCountByBussines(getAllPosts.data?.length)}
                  onClick={() =>
                    pushModal('PostNew', {
                      callAfarResources,
                    })
                  }
                  className="ml-auto"
                />

                <ButtonRefresh onClick={filters.onRefresh} isBusy={getAllPosts.status.isBusy} />
              </TopActions>,
            )}

            <Divider className="!my-3" />

            <Filters
              business={businessOwnerData.business}
              onChange={(filtersValue) => filters.onMergeFilters(filtersValue)}
              value={filters.value}
            />

            <Divider className="!my-3" />

            <Table
              className="!max-h-[calc(100vh-25rem)]"
              heads={getBulkHeaderNodes([
                null,
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
                      routeName={routeName}
                      callAfarResources={callAfarResources}
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
                          <span className="text-red-500">Desabilitada</span>
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
