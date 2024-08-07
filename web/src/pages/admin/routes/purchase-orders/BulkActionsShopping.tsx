import { useRef } from 'react';

import { BulkActions, BulkActionsProps, BulkMeta } from 'components/bulk-actions';
import { IconButtonOptionsBars } from 'components/icon-button-options-bars';
import { Menu } from 'components/menu';

import { useAddOneBillAdmin } from 'features/api/admin/useAddOneBillAdmin';

import { GetAllShoppingAdminQuery } from 'types/api';
import { Shopping } from 'types/shopping';

type Actions = 'newBill';
export interface BulkActionsShoppingProps
  extends Pick<BulkActionsProps<Actions, Shopping>, 'children'> {
  onRefresh: () => void;
  filters: GetAllShoppingAdminQuery;
}

export const BulkActionsShopping = ({
  onRefresh,
  filters,
  ...omittedProps
}: BulkActionsShoppingProps) => {
  //@ts-expect-error ignore this, need complete default values
  const refMeta = useRef<BulkMeta<Shopping>>({});

  const { addOneBillAdmin } = useAddOneBillAdmin();

  const handleNewBill = () => {
    const { selected, onReset, selectedAll } = refMeta.current;
    const { dateFrom, dateTo, routeNames, states } = filters;

    if (selectedAll && routeNames?.length === 1) {
      return addOneBillAdmin.fetch(
        { routeName: routeNames[0], dateFrom, dateTo, states },
        {
          onAfterSuccess: () => {
            onReset();
            onRefresh();
          }
        }
      );
    }

    if (selected.length) {
      const { routeName } = selected[0]; // is the same routeName por all selected items

      return addOneBillAdmin.fetch(
        { routeName, shoppingIds: selected.map((s) => s._id) },
        {
          onAfterSuccess: () => {
            onReset();
            onRefresh();
          }
        }
      );
    }
  };

  return (
    <BulkActions<Actions, Shopping>
      refMeta={refMeta}
      getBulkActionBtnProps={({ action }) => {
        switch (action) {
          case 'newBill':
            return {
              label: 'Crear Factura',
              onClick: () => handleNewBill(),
              isBusy: addOneBillAdmin.status.isBusy
            };
          default:
            return {};
        }
      }}
      renderMenuNode={({ setAction }) => (
        <Menu
          buttonElement={<IconButtonOptionsBars />}
          items={[
            {
              label: 'Crear factura',
              onClick: () => setAction('newBill'),
              disabled: filters.routeNames?.length !== 1
            }
          ]}
        />
      )}
      {...omittedProps}
    />
  );
};
