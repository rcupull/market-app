import { useEffect } from 'react';

import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useGetAllAdminUsers } from 'features/api/useGetAllAdminUsers';

import { callAfarIds, useCallFromAfar } from 'hooks/useCallFromAfar';

import { PaymentHistory } from './PaymentHistory';
import { RowActions } from './RowActions';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { TopActions } from 'pages/@common/top-actions';
import { User } from 'types/auth';
import { getDateString } from 'utils/date';

export const Users = () => {
  const { getAllAdminUsers } = useGetAllAdminUsers();

  const onRefresh = () => getAllAdminUsers.fetch(undefined);
  useCallFromAfar(callAfarIds.getAllAdminUsers, onRefresh);

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <LayoutPageSection title="Usuarios">
      <TopActions className="justify-end mb-2">
        <ButtonRefresh onClick={onRefresh} isBusy={getAllAdminUsers.status.isBusy} />
      </TopActions>

      <Table<User>
        heads={[null, 'Nombre', 'Email', 'Validado', 'Plan Contratado', 'Fecha de Creación']}
        getRowProps={(rowData) => {
          const { name, createdAt, email, validated } = rowData;

          return {
            nodes: [
              <RowActions
                key="RowActions"
                rowData={rowData}
                callAfarResources={callAfarIds.getAllAdminUsers}
              />,
              name,
              email,
              `${validated}`,
              <PaymentHistory
                key="PaymentHistory"
                user={rowData}
                callAfarResources={callAfarIds.getAllAdminUsers}
              />,
              getDateString({ date: createdAt, showTime: true }),
            ],
          };
        }}
        data={getAllAdminUsers.data}
      />
    </LayoutPageSection>
  );
};
