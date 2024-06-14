import { useRef } from 'react';

import { BulkActions, BulkActionsProps, BulkMeta } from 'components/bulk-actions';
import { IconButtonOptionsBars } from 'components/icon-button-options-bars';
import { Menu } from 'components/menu';

import { useAddOneBillAdmin } from 'features/api/admin/useAddOneBillAdmin';

import { Shopping } from 'types/shopping';

export interface BulkActionsShoppingProps extends Pick<BulkActionsProps, 'children'> {
  onRefresh: () => void;
}

export const BulkActionsShopping = ({ onRefresh, ...omittedProps }: BulkActionsShoppingProps) => {
  //@ts-expect-error ignore this, need complete default values
  const refMeta = useRef<BulkMeta<Shopping>>({});

  const { addOneBillAdmin } = useAddOneBillAdmin();

  const handleNewBill = () => {
    const { selected, onReset } = refMeta.current;

    if (selected.length) {
      const { routeName } = selected[0]; // is the same routeName por all selected items

      addOneBillAdmin.fetch(
        { routeName, shoppingIds: selected.map((s) => s._id) },
        {
          onAfterSuccess: () => {
            onReset();
            onRefresh();
          },
        },
      );
    }
  };

  return (
    <BulkActions<'newBill'>
      refMeta={refMeta}
      getBulkActionBtnProps={({ action }) => {
        switch (action) {
          case 'newBill':
            return {
              label: 'Crear Factura',
              onClick: () => handleNewBill(),
            };
          default:
            return {};
        }
      }}
      renderMenuNode={({ setAction }) => (
        <Menu
          buttonElement={
            <div className="flex items-center">
              <IconButtonOptionsBars />
              <span className="ml-2">Acciones múltiples</span>
            </div>
          }
          items={[
            {
              label: 'Crear factura',
              onClick: () => setAction('newBill'),
            },
          ]}
        />
      )}
      {...omittedProps}
    />
  );
};
