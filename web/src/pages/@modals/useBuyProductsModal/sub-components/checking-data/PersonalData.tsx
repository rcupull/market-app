import { useEffect } from 'react';

import { AddressView } from 'components/address-view';
import { Button } from 'components/button';

import { useAuth } from 'features/api-slices/useAuth';

import { useUserUpdateSettings } from 'pages/@modals/useUserUpdateSettings';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';
import { getIsValidAddress, getIsValidPhone } from 'utils/validation';

export interface PersonalDataProps extends StyleProps {
  onValid: (valid: boolean) => void;
}

export const PersonalData = ({ className, onValid }: PersonalDataProps) => {
  const { authData, onRefreshAuthUser } = useAuth();
  const userUpdateSettings = useUserUpdateSettings();

  const user = authData?.user;

  const { phone, address } = user || {};

  const isValidAddress = getIsValidAddress(address);
  const isValidPhone = getIsValidPhone(phone);
  const isValid = isValidAddress && isValidPhone;

  useEffect(() => {
    onValid(isValid);
  }, [isValid]);

  if (!user) {
    return <></>;
  }

  return (
    <div className={cn('flex flex-col ring ring-yellow-500 rounded-lg p-2', className)}>
      <span className="text-center w-full font-bold">Contacto</span>

      <div className="flex gap-1 mt-3">
        <span className="font-semibold">Teléfono:</span>
        {isValidPhone ? <span>{phone}</span> : <span className="text-red-500">Incompleto</span>}
      </div>

      <div className="flex mt-2 gap-1">
        <span className="font-semibold text-nowrap">Dirección: </span>

        {isValidAddress ? (
          <AddressView address={address || {}} />
        ) : (
          <span className="text-red-500">Incompleta</span>
        )}
      </div>

      <div className="flex w-full">
        <Button
          label="Editar"
          variant="link"
          onClick={() =>
            userUpdateSettings.open({
              user,
              onAfterSuccess: () => {
                onRefreshAuthUser();
              },
            })
          }
          className="!ml-auto"
        />
      </div>
    </div>
  );
};
