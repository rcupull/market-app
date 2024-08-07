import { useEffect } from 'react';

import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useGetAllUsersAdmin } from 'features/api/admin/useGetAllUsersAdmin';

import { useFiltersVolatile } from 'hooks/useFiltersVolatile';

import { RowActions } from './RowActions';

import { TopActions } from 'pages/@common/top-actions';
import { useInfiniteScrolling } from 'pages/@hooks/useInfiniteScrolling';
import { GetAllUserAdminQuery } from 'types/api';
import { User } from 'types/auth';
import { getDateString } from 'utils/date';

export const Users = () => {
  const { getAllUsersAdmin } = useGetAllUsersAdmin();

  const filters = useFiltersVolatile<GetAllUserAdminQuery>({
    onChange: (filters) => {
      getAllUsersAdmin.fetch(filters);
    }
  });

  const infiniteScrolling = useInfiniteScrolling({
    fetchPaginatedResources: getAllUsersAdmin,
    onFetch: ({ page }) => filters.onMergeFilters({ page })
  });

  const onRefreshForce = () => {
    filters.onMergeFilters({ page: 1 }, { forceFetch: true });
  };

  useEffect(() => {
    onRefreshForce();
  }, []);

  return (
    <>
      <TopActions className="justify-end mb-2">
        <ButtonRefresh onClick={onRefreshForce} isBusy={infiniteScrolling.status.isBusy} />
      </TopActions>

      <Table<User>
        className="max-h-[calc(100vh-15rem)]"
        remapRowsIndex={{
          xs: [[0, 1, 2, 3, 4]],
          lg: 'none'
        }}
        heads={['Acciones', 'Nombre', 'Email', 'Validado', 'Creación']}
        getRowProps={(rowData) => {
          const { name, createdAt, email, validated } = rowData;

          return {
            nodes: [
              <RowActions key="RowActions" rowData={rowData} onRefresh={onRefreshForce} />,
              name,
              email,
              `${validated}`,
              getDateString({ date: createdAt, showTime: true })
            ]
          };
        }}
        data={infiniteScrolling.data}
        onScrollBottom={infiniteScrolling.onScrollBottom}
        isBusyBottom={infiniteScrolling.status.isBusy}
      />
    </>
  );
};

export default Users;
