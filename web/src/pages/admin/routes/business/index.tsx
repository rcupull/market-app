import { useEffect } from 'react';

import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useGetAllBusinessAdmin } from 'features/api/admin/useGetAllBusinessAdmin';

import { RowActions } from './RowActions';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { TopActions } from 'pages/@common/top-actions';
import { getDateString } from 'utils/date';

export const BusinessPage = () => {
  const { getAllBusinessAdmin } = useGetAllBusinessAdmin();

  const onRefresh = () => getAllBusinessAdmin.fetch({});

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <LayoutPageSection title="Negocios">
      <TopActions className="justify-end mb-2">
        <ButtonRefresh onClick={onRefresh} isBusy={getAllBusinessAdmin.status.isBusy} />
      </TopActions>

      <Table
        remapRowsIndex={{
          xs: [[0, 1, 2, 3, 4, 5]],
          xl: 'none',
        }}
        heads={['Acciones', 'Nombre', 'Usuario', 'Routename', 'Posts', 'Fecha de Creación']}
        getRowProps={(rowData) => {
          const { name, createdAt, routeName, userData, postCount } = rowData;

          return {
            nodes: [
              <RowActions key="RowActions" rowData={rowData} onRefresh={onRefresh} />,
              <span key="businessName" className="text-nowrap">
                {name}
              </span>,
              <span key="userName" className="text-nowrap">
                {userData?.name}
              </span>,
              routeName,
              postCount,
              getDateString({ date: createdAt, showTime: true }),
            ],
          };
        }}
        data={getAllBusinessAdmin.data}
      />
    </LayoutPageSection>
  );
};

export default BusinessPage;
