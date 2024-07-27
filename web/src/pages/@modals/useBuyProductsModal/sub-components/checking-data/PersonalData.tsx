import { useEffect } from 'react';

import { AddressView } from 'components/address-view';
import { Button } from 'components/button';
import { ButtonDescription } from 'components/button-decription';
import { HighlightedBox } from 'components/highlighted-box';

import { useAuth } from 'features/api-slices/useAuth';

import { useUserUpdateSettingsModal } from 'pages/@modals/useUserUpdateSettingsModal';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';
import { getIsValidAddress, getIsValidPhone } from 'utils/validation';

export interface PersonalDataProps extends StyleProps {
  onValid: (valid: boolean) => void;
}

export const PersonalData = ({ className, onValid }: PersonalDataProps) => {
  const { user, onRefreshAuthUser } = useAuth();
  const { userUpdateSettingsModal } = useUserUpdateSettingsModal();

  const { phone, addresses } = user || {};

  const address = addresses?.[0];

  const isValidAddress = !!address && getIsValidAddress(address);
  const isValidPhone = !!phone && getIsValidPhone(phone);
  const isValid = isValidAddress && isValidPhone;

  useEffect(() => {
    onValid(isValid);
  }, [isValid]);

  if (!user) {
    return <></>;
  }

  return (
    <HighlightedBox className={className} variant="info">
      <div className={cn('flex flex-col p-2 w-full')}>
        <div className="flex items-center justify-center">
          <span className="text-center font-bold">Contacto</span>
          <ButtonDescription
            className="inline-block"
            description={
              <div>
                Es requerido que los usuarios completen sus datos personales para poder solicitar
                una orden de compra. Estos datos son usados por los comerciantes para poder realizar
                las entregas a domicilio. Además la dirección es usada por nuestros algorimos de
                localizacion de productos de interés.
              </div>
            }
          />
        </div>

        <div className="flex gap-1 mt-3">
          <span className="font-semibold">Teléfono:</span>
          {isValidPhone ? <span>{phone}</span> : <span className="text-red-500">Incompleto</span>}
        </div>

        <div className="flex mt-2 gap-1">
          <span className="font-semibold text-nowrap">Dirección: </span>

          {isValidAddress ? (
            <AddressView address={address} />
          ) : (
            <span className="text-red-500">Incompleta</span>
          )}
        </div>

        <div className="flex w-full">
          <Button
            label="Editar"
            variant="link"
            onClick={() =>
              userUpdateSettingsModal.open({
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
    </HighlightedBox>
  );
};
