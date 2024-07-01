import { AddressView } from 'components/address-view';
import { Button } from 'components/button';

import { useAuth } from 'features/api-slices/useAuth';

import { useUserUpdateSettings } from 'pages/@modals/useUserUpdateSettings';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface PersonalDataProps extends StyleProps {}

export const PersonalData = ({ className }: PersonalDataProps) => {
  const { authData, onRefreshAuthUser } = useAuth();
  const userUpdateSettings = useUserUpdateSettings();

  const user = authData?.user;

  if (!user) {
    return <></>;
  }

  const { phone, address } = user;

  return (
    <div className={cn('flex flex-col ring ring-yellow-500 rounded-lg p-2', className)}>
      <div>
        <span className="font-bold">Telefono de contacto: </span>
        <span>{phone}</span>
      </div>

      <div className="flex">
        <span className="font-bold text-nowrap">Dirección de contacto: </span>
        <AddressView address={address || {}} />
      </div>

      <div className="flex w-full">
        <Button
          label="Preferencias de contacto"
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
