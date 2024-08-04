import { Link } from 'react-router-dom';

import { Menu } from 'components/menu';

import { useAuth } from 'features/api-slices/useAuth';

import { useRouter } from 'hooks/useRouter';

import { BusinessFavoriteButton } from './business-favorite-button';

import SvgBookmarkSolid from 'icons/BookmarkSolid';
import SvgTruckSolid from 'icons/TruckSolid';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { getDeliveryUtils, getOneBusinessRoute } from 'utils/business';
import { cn } from 'utils/general';

export const BusinessMainBar = () => {
  const { user, isAuthenticated } = useAuth();
  const { business } = useBusiness();
  const { isOneBusinessPage } = useRouter();

  const isEnabledDelivery = getDeliveryUtils().getIsEnabled({
    deliveryConfig: business?.deliveryConfig
  });

  const { pushRoute } = useRouter();

  if (!isAuthenticated) {
    return null;
  }

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

        {user?.favoritesBusiness?.map(({ name, routeName }, index) => {
          return (
            <Link
              to={getOneBusinessRoute({ routeName })}
              key={index}
              className={cn('p-2 hover:bg-gray-200 text-nowrap', {
                'bg-gray-100 border-b-2 border-indigo-500': routeName === business?.routeName
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
        items={(user?.favoritesBusiness || []).map(({ name, routeName }) => {
          return {
            label: name || '<unknown name>',
            active: routeName === business?.routeName,

            onClick: () => {
              pushRoute(getOneBusinessRoute({ routeName }));
            }
          };
        })}
      />

      <div className="flex items-center gap-2 ml-auto mr-3">
        {isEnabledDelivery && (
          <div title="Tenemos entrega al domicilio">
            <SvgTruckSolid className="fill-gray-500 size-6 8" />
          </div>
        )}

        {isOneBusinessPage && business && <BusinessFavoriteButton routeName={business.routeName} />}
      </div>
    </div>
  );
};
