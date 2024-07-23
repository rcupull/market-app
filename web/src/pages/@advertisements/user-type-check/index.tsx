import { Button } from 'components/button';
import { HighlightedBox } from 'components/highlighted-box';

import { useUpdateChecksUser } from 'features/api/user/useUpdateChecksUser';
import { useAuth } from 'features/api-slices/useAuth';

import { GotItBox } from '../GotItBox';

import { useUserUpdateSettingsModal } from 'pages/@modals/useUserUpdateSettingsModal';

export const AdvertisementsUserTypeCheck = () => {
  const { user, onRefreshAuthUser, isAuthenticated } = useAuth();
  const { updateChecksUser } = useUpdateChecksUser();
  const userUpdateSettings = useUserUpdateSettingsModal();

  if (!isAuthenticated || user?.checks?.requestUserTypeWhenStart) {
    return <></>;
  }

  const handleUpdateFlag = () => {
    if (!user) return;

    updateChecksUser.fetch(
      {
        userId: user._id,
        update: {
          requestUserTypeWhenStart: true,
        },
      },
      {
        onAfterSuccess: () => onRefreshAuthUser(),
      }
    );
  };

  return (
    <HighlightedBox variant="info">
      <GotItBox
        gotItButtonProps={{
          onClick: handleUpdateFlag,
          isBusy: updateChecksUser.status.isBusy,
          label: 'Entendido',
        }}
      >
        <span>
          Parece que entras a nuestro sistema por primera vez. En tus{' '}
          <Button
            variant="link"
            onClick={() => {
              if (!user) return;
              userUpdateSettings.open({ user, onAfterSuccess: onRefreshAuthUser });

              handleUpdateFlag();
            }}
            label="preferencias de usuario"
            className="!inline-block !text-lg !mx-1"
          />
          puedes seleccionar otros roles que tenemos para ti y convertirte en{' '}
          <span className="font-bold">comerciante</span> o{' '}
          <span className="font-bold">mensajero</span> de nuestra plataforma.
        </span>
      </GotItBox>
    </HighlightedBox>
  );
};
