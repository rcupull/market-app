import { Button } from 'components/button';
import { Tabs } from 'components/tabs';

import { TableAll } from './table-all';
import { TableDelivered } from './table-delivered';
import { TableRejected } from './table-rejected';
import { TableRequested } from './table-requested';

export const PurchaseOrders = () => {
  return (
    <Tabs
      className="p-2 gap-2"
      itemRender={({ selected, label }) => (
        <Button label={label} variant={selected ? 'sublined' : 'transparent'} />
      )}
      items={[
        {
          label: 'Solicitados',
          content: <TableRequested />,
        },
        {
          label: 'Entregados',
          content: <TableDelivered />,
        },
        {
          label: 'Rechazadas',
          content: <TableRejected />,
        },
        {
          label: 'Todas',
          content: <TableAll />,
        },
      ]}
    />
  );
};
