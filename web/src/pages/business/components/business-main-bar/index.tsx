import { Link } from 'react-router-dom';

import { IconButtonFavorite } from 'components/icon-button-favorite';
import { Menu } from 'components/menu';

import { useAddFavoriteBusinessToUser } from 'features/api/user/useAddFavoriteBusinessToUser';
import { useRemoveFavoriteBusinessFromUser } from 'features/api/user/useRemoveFavoriteBusinessFromUser';
import { useAuth } from 'features/api-slices/useAuth';

import { useRouter } from 'hooks/useRouter';

import SvgBookmarkSolid from 'icons/BookmarkSolid';
import SvgTruckSolid from 'icons/TruckSolid';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { getDeliveryUtils, getOneBusinessRoute } from 'utils/business';
import { cn } from 'utils/general';

export const BusinessMainBar = () => {
  const { authData, onRefreshAuthUser } = useAuth();
  const { business } = useBusiness();

  const user = authData?.user;

  const isEnabledDelivery = getDeliveryUtils().getIsEnabled({
    deliveryConfig: business?.deliveryConfig,
  });

  const { addFavoriteBusinessToUser } = useAddFavoriteBusinessToUser();
  const { removeFavoriteBusinessFromUser } = useRemoveFavoriteBusinessFromUser();

  const isFavorite = !!business && user?.favoritesBusinessRouteNames?.includes(business.routeName);

  const { pushRoute } = useRouter();

  const renderFavorite = () => {
    return (
      <span className="flex items-center text-gray-500 font-bold p-2 bg-gray-200">
        <SvgBookmarkSolid className="fill-gray-500 size-6 mx-2" /> Favoritos
      </span>
    );
  };
  return (
    <div className="flex items-center border-b-2 border-b-gray-200">
      <div className="hidden sm:flex items-center overflow-auto ">
        {renderFavorite()}

        {authData?.user?.favoritesBusinessRouteNames?.map((routeName, index) => {
          const name = authData?.user?.favoritesBusinessNames?.[index];

          return (
            <Link
              to={getOneBusinessRoute({ routeName })}
              key={routeName}
              className={cn('p-2 hover:bg-gray-200 text-nowrap', {
                'bg-gray-100 border-b-2 border-indigo-500': routeName === business?.routeName,
              })}
            >
              {name}
            </Link>
          );
        })}
      </div>

      <Menu
        className={cn('sm:hidden')}
        buttonElement={renderFavorite()}
        items={(authData?.user?.favoritesBusinessRouteNames || []).map((routeName, index) => {
          const name = authData?.user?.favoritesBusinessNames?.[index];

          return {
            label: name || '<unknown name>',
            active: routeName === business?.routeName,

            onClick: () => {
              pushRoute(getOneBusinessRoute({ routeName }));
            },
          };
        })}
      />

      <div className="flex items-center gap-2 ml-auto mr-3">
        {isEnabledDelivery && (
          <div title="Tenemos entrega al domicilio">
            <SvgTruckSolid className="fill-gray-500 size-6 8" />
          </div>
        )}
        <IconButtonFavorite
          fill={isFavorite}
          isBusy={
            addFavoriteBusinessToUser.status.isBusy || removeFavoriteBusinessFromUser.status.isBusy
          }
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
              }
            );
          }}
        />
      </div>
    </div>
  );
};
