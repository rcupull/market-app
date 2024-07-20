import { AddressView } from 'components/address-view';
import { Divider } from 'components/divider';

import { ListDetailsKey } from 'pages/@common/list-details-key';
import { ListDetailsValue } from 'pages/@common/list-details-value';
import { Shopping } from 'types/shopping';
import { wasApprovedShopping } from 'utils/shopping';
import { getIsValidAddress } from 'utils/validation';

export interface ClientDataProps {
  rowData: Shopping;
}
export const ClientData = ({ rowData }: ClientDataProps) => {
  const { purchaserName, purchaserAddress, purchaserPhone } = rowData;

  if (!wasApprovedShopping(rowData)) {
    return <span className="text-gray-400">Visible al aceptar la orden</span>;
  }

  return (
    <div className="w-48 sm:w-60">
      <ListDetailsKey label="Nombre" />
      <ListDetailsValue value={purchaserName} />

      <Divider narrow />

      <ListDetailsKey label="Teléfono" />
      <ListDetailsValue value={purchaserPhone} />

      <Divider narrow />

      <ListDetailsKey label="Dirección" />
      <ListDetailsValue
        value={
          purchaserAddress &&
          getIsValidAddress(purchaserAddress) && <AddressView address={purchaserAddress} />
        }
      />
    </div>
  );
};
