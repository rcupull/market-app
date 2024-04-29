import { Button } from 'components/button';
import { Tabs } from 'components/tabs';

import { TableAll } from './table-all';
import { TableCanceled } from './table-canceled';
import { TableContruction } from './table-construction';
import { TableDelivered } from './table-delivered';
import { TableRequested } from './table-requested';

export const PurchaseOrders = () => {
  return (
    <Tabs
      itemRender={({ selected, label }) => (
        <Button label={label} variant={selected ? 'primary' : 'outlined'} />
      )}
      items={[
        {
          label: 'Solicitados',
          content: <TableRequested />,
        },
        {
          label: 'En construcción',
          content: <TableContruction />,
        },
        {
          label: 'Entregados',
          content: <TableDelivered />,
        },
        {
          label: 'Cancelados',
          content: <TableCanceled />,
        },
        {
          label: 'Todas',
          content: <TableAll />,
        },
      ]}
    />
  );
};
