import { useEffect } from 'react';

import { ButtonNew } from 'components/button-new';
import { ButtonRefresh } from 'components/button-refresh';
import { IconButtonAdd } from 'components/icon-button-add';
import { IconButtonRefresh } from 'components/icon-button-refresh';
import { Table } from 'components/table';

import { useGetAllPosts } from 'features/api/posts/useGetAllPosts';

import { useFiltersVolatile } from 'hooks/useFiltersVolatile';

import { BulkActions } from './BulkActions';
import { RowActions } from './RowActions';

import { TopActions } from 'pages/@common/top-actions';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useInfiniteScrolling } from 'pages/@hooks/useInfiniteScrolling';
import { useBusinessNewUpdatePost } from 'pages/@modals/useBusinessNewUpdatePost';
import { GetAllPostsQuery } from 'types/api';
import { getImageEndpoint } from 'utils/api';
import { getDateString } from 'utils/date';
import { cn } from 'utils/general';
import { viewUtils } from 'utils/view';

export const Links = () => {
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
          postType: 'link',
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

  const buttonNew = (
    <>
      <ButtonNew
        label="Nuevo enlace"
        onClick={() => {
          businessNewUpdatePost.open({
            postType: 'link',
            onAfterSuccess: () => onRefreshForce(),
          });
        }}
        className="ml-auto hidden sm:block"
      />
      <IconButtonAdd
        title="Nuevo enlace"
        onClick={() => {
          businessNewUpdatePost.open({
            postType: 'link',
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
              </TopActions>
            )}

            <Table
              className="!max-h-[calc(100vh-25rem)]"
              remapRowsIndex={{
                xs: [[0, 1, 2, 3, 4]],
                lg: 'none',
              }}
              heads={getBulkHeaderNodes([
                'Acciones',
                'Nombre',
                'Imágen',
                'Fecha de Creación',
                'Detalles',
              ])}
              getRowProps={(rowData) => {
                const { name, createdAt, hidden, images } = rowData;

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
                    ]),
                  ]),
                };
              }}
              data={infiniteScrolling.tableData}
              onScrollBottom={infiniteScrolling.onScrollBottom}
              isBusy={getAllPosts.status.isBusy}
            />
          </>
        )}
      </BulkActions>
    </div>
  );
};
