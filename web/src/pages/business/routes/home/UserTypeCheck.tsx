import { Button } from 'components/button';
import { HighlightedBox } from 'components/highlighted-box';

import { useUpdateChecksUser } from 'features/api/user/useUpdateChecksUser';
import { useAuth } from 'features/api-slices/useAuth';

export const UserTypeCheck = () => {
  const { user, onRefreshAuthUser, isAuthenticated } = useAuth();
  const { updateChecksUser } = useUpdateChecksUser();

  if (!isAuthenticated || user?.checks?.requestUserTypeWhenStart) {
    return <></>;
  }

  return (
    <HighlightedBox variant="info">
      <div className="flex flex-col sm:flex-row text-center sm:text-start items-center sm:items-start gap-3 sm:justify-between w-full text-lg text-gray-700">
        <span>
          Parece que entras a nuestro sistema por primera vez. En tus{' '}
          <span className="font-bold">Preferencias de usuario</span> puedes seleccionar otros roles
          que tenemos para ti y convertirte en <span className="font-bold">comerciante</span> o{' '}
          <span className="font-bold">mensajero</span> en nuestra plataforma.
        </span>
        <Button
          label="Entendido"
          isBusy={updateChecksUser.status.isBusy}
          onClick={() => {
            user &&
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
          }}
        />
      </div>
    </HighlightedBox>
  );
};
