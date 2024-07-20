import { IconButtonAddProps, IconButtonFavorite } from 'components/icon-button-favorite';

import { useAddFavoriteUser } from 'features/api/business/useAddFavoriteUser';
import { useRemoveFavoriteUser } from 'features/api/business/useRemoveFavoriteUser';
import { useAuth } from 'features/api-slices/useAuth';

export interface BusinessFavoriteButtonProps extends IconButtonAddProps {
  routeName: string;
}

export const BusinessFavoriteButton = ({
  routeName,
  ...omittedProps
}: BusinessFavoriteButtonProps) => {
  const { user, onRefreshAuthUser } = useAuth();

  const { addFavoriteUser } = useAddFavoriteUser();
  const { removeFavoriteUser } = useRemoveFavoriteUser();

  const isFavorite = !!user?.favoritesBusiness?.find((f) => f?.routeName === routeName);

  return (
    <IconButtonFavorite
      fill={isFavorite}
      isBusy={addFavoriteUser.status.isBusy || removeFavoriteUser.status.isBusy}
      onClick={() => {
        if (!user) return;

        (isFavorite ? removeFavoriteUser : addFavoriteUser).fetch(
          {
            userId: user._id,
            routeName,
          },
          {
            onAfterSuccess: () => {
              onRefreshAuthUser();
            },
          }
        );
      }}
      {...omittedProps}
    />
  );
};
