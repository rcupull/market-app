import { useEffect } from 'react';

import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useGetAllUsersAdmin } from 'features/api/admin/useGetAllUsersAdmin';

import { RowActions } from './RowActions';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { TopActions } from 'pages/@common/top-actions';
import { User } from 'types/auth';
import { getDateString } from 'utils/date';

export const Users = () => {
  const { getAllUsersAdmin } = useGetAllUsersAdmin();

  const onRefresh = () => getAllUsersAdmin.fetch(undefined);

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <LayoutPageSection title="Usuarios">
      <TopActions className="justify-end mb-2">
        <ButtonRefresh onClick={onRefresh} isBusy={getAllUsersAdmin.status.isBusy} />
      </TopActions>

      <Table<User>
        remapRowsIndex={{
          xs: [[0, 1, 2, 3, 4]],
          xl: 'none'
        }}
        heads={['Acciones', 'Nombre', 'Email', 'Validado', 'Creación']}
        getRowProps={(rowData) => {
          const { name, createdAt, email, validated } = rowData;

          return {
            nodes: [
              <RowActions key="RowActions" rowData={rowData} onRefresh={onRefresh} />,
              name,
              email,
              `${validated}`,
              getDateString({ date: createdAt, showTime: true })
            ]
          };
        }}
        data={getAllUsersAdmin.data}
      />
    </LayoutPageSection>
  );
};

export default Users;
