import { AddressView } from 'components/address-view';
import { Divider } from 'components/divider';

import { Shopping } from 'types/shopping';
import { cn } from 'utils/general';
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

  const renderKey = (label: string) => {
    return <div className="font-bold text-xs text-gray-400">{label}</div>;
  };

  const renderValue = (value: React.ReactNode) => {
    return (
      <div
        className={cn('font-semibold', {
          'text-red-500 font-normal': !value,
        })}
      >
        {value || '(Incompleto)'}
      </div>
    );
  };

  return (
    <div className="w-48 sm:w-60">
      {renderKey('Nombre')}
      {renderValue(purchaserName)}

      <Divider className="!my-1" />

      {renderKey('Teléfono')}
      {renderValue(purchaserPhone)}

      <Divider className="!my-1" />

      {renderKey('Dirección')}
      {renderValue(
        purchaserAddress && getIsValidAddress(purchaserAddress) && (
          <AddressView address={purchaserAddress} />
        )
      )}
    </div>
  );
};
