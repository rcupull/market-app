import { Link } from 'react-router-dom';

import { IconButtonFavorite } from 'components/icon-button-favorite';

import { useAddFavoriteBusinessToUser } from 'features/api/user/useAddFavoriteBusinessToUser';
import { useRemoveFavoriteBusinessFromUser } from 'features/api/user/useRemoveFavoriteBusinessFromUser';
import { useAuth } from 'features/api-slices/useAuth';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { getOneBusinessRoute } from 'utils/business';
import { cn } from 'utils/general';

export const FavoritesBusinessBar = () => {
  const { authData, onRefreshAuthUser } = useAuth();
  const { business } = useBusiness();

  const user = authData?.user;

  const { addFavoriteBusinessToUser } = useAddFavoriteBusinessToUser();
  const { removeFavoriteBusinessFromUser } = useRemoveFavoriteBusinessFromUser();

  const isFavorite = !!business && user?.favoritesBusinessRouteNames?.includes(business.routeName);

  return (
    <div className="flex items-center">
      {authData?.user?.favoritesBusinessRouteNames?.map((routeName, index) => {
        const name = authData?.user?.favoritesBusinessNames?.[index];

        return (
          <Link
            to={getOneBusinessRoute({ routeName })}
            key={routeName}
            className={cn('p-2 hover:bg-gray-200', {
              'bg-gray-100 border-b-2 border-indigo-500': routeName === business?.routeName,
            })}
          >
            {name}
          </Link>
        );
      })}

      <IconButtonFavorite
        fill={isFavorite}
        className="ml-auto mr-3"
        onClick={() => {
          if (!user) return;
          if (!business) return;

          (isFavorite ? removeFavoriteBusinessFromUser : addFavoriteBusinessToUser).fetch(
            {
              userId: user._id,
              routeName: business.routeName,
            },
            {
              onAfterSuccess: () => {
                onRefreshAuthUser();
              },
            },
          );
        }}
      />
    </div>
  );
};
