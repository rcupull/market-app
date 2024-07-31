import { MapOlPosition } from 'components/map/types';

import { queryToSearch } from 'hooks/useRouter/utils';

import { getDeliveryConfigPrice } from './delivery';
import { deepJsonCopy, isNullOrUndefined } from './general';
import { getDistanceBetweenPositions } from './geolocation';

import { Business, DeliveryConfig, DeliveryConfigType, SearchLayoutType } from 'types/business';
import { Address } from 'types/general';
import { Post } from 'types/post';
import { Shopping } from 'types/shopping';

const LETERS_NUMBERS_REGEX = /^[a-zA-Z0-9]*$/;
export const getRouteName = (name: string): string => {
  return name
    .trim()
    .toLowerCase()
    .split('')
    .map((char) => (LETERS_NUMBERS_REGEX.test(char) ? char : '-')) // replace to -
    .join('')
    .normalize('NFD');
};

export const getPostCategoryTag = (label: string): string => {
  return label
    .trim()
    .toLowerCase()
    .split('')
    .map((char) => (LETERS_NUMBERS_REGEX.test(char) ? char : '_')) // replace to _
    .join('')
    .normalize('NFD');
};

export const getInitials = (fullname: string) => {
  const names = fullname.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export const getOnePostRoute = (args: { routeName: string; postId: string }) => {
  return `${getPostsRoute({ routeName: args.routeName })}/${args.postId}`;
};

export const getPostsRoute = (args: { routeName: string }) => {
  return `${getOneBusinessRoute({ routeName: args.routeName })}/posts`;
};

export const getShoppingRoute = (args: { routeName: string }) => {
  return `${getOneBusinessRoute({ routeName: args.routeName })}/shopping`;
};
export const getOneShoppingRoute = (args: { routeName: string; shoppingId: string }) => {
  return `${getOneBusinessRoute({ routeName: args.routeName })}/shopping/${args.shoppingId}`;
};

export const getOneBusinessRoute = (args: { routeName: string }) => {
  return `${getBusinessRoute()}/${args.routeName}`;
};

export const getBusinessRoute = () => {
  return `/b`;
};

export const getBusinessAboutUsRoute = (args: { routeName: string }) => {
  return `${getOneBusinessRoute({ routeName: args.routeName })}/about-us`;
};

export const getDashboardBusinessRoute = (args: { routeName: string }) => {
  return `/dashboard/business/${args.routeName}`;
};

export const getDashboardBusinessShoppingTabRequested = ({ routeName }: { routeName: string }) => {
  return `${getDashboardBusinessRoute({ routeName })}?bussinessTab=shopping&state=REQUESTED`;
};

export const getDashboardRoute = () => {
  return `/dashboard`;
};

export const getAdminRoute = () => {
  return `/admin`;
};

export const getSearchLayoutLabel = (type: SearchLayoutType): string => {
  switch (type) {
    case 'none':
      return 'Ninguno';
    case 'left':
      return 'Barra de búsqueda(izq)';
    case 'center':
      return 'Barra de búsqueda(cen)';
    case 'right':
      return 'Barra de búsqueda(der)';
    case 'postCategories':
      return 'Categorías(selección múltiple)';
    case 'postCategoriesScrollable':
      return 'Categorías(seleccion múltiple y deslizables)';
    case 'postCategoriesExcluded':
      return 'Categorías(selección simple)';
    case 'postCategoriesExcludedScrollable':
      return 'Categorías(selección simple y deslizable)';
    default:
      return 'unknown category';
  }
};

export const getLayoutsFromBusiness = (business: Business) => {
  return deepJsonCopy(business.layouts || {});
};

export const getWhatsAppPostLink = (phoneNumber: string, post: Post) => {
  const { name, routeName, _id } = post;

  const postRoute = getOnePostRoute({ routeName, postId: _id });

  const postUrl = `${window.location.origin}${postRoute}`;

  const search = queryToSearch({
    text: `Le escribo referente al producto *${name}* con link de referencia ${postUrl}`,
  });

  return `https://wa.me/${phoneNumber}?${search}`;
};

export const getWhatsAppShoppingLink = (phoneNumber: string, shopping: Shopping) => {
  const { _id, routeName } = shopping;

  const shoppingRoute = getOneShoppingRoute({ routeName, shoppingId: _id });

  const shoppingUrl = `${window.location.origin}${shoppingRoute}`;

  const search = queryToSearch({
    text: `Le escribo referente a la orden de compra *${_id}* que posee algunos artículos de mi interes. Puede ver los detalles en el link ${shoppingUrl}`,
  });

  return `https://wa.me/${phoneNumber}?${search}`;
};

interface GetDeliveryUtilsReturn {
  getIsEnabled: (args: { deliveryConfig: DeliveryConfig | undefined }) => boolean;
  getDistance: (args: {
    businessAddress: Address | undefined;
    userAddress: Address | undefined;
  }) => number | null;
  getPrice: (args: {
    deliveryConfig: DeliveryConfig | undefined;
    distance: number | null;
  }) => number | null;
}
export const getDeliveryUtils = (): GetDeliveryUtilsReturn => {
  const getIsEnabled: GetDeliveryUtilsReturn['getIsEnabled'] = ({ deliveryConfig }) => {
    return !!deliveryConfig && deliveryConfig.type !== DeliveryConfigType.NONE;
  };

  const getDistance: GetDeliveryUtilsReturn['getDistance'] = ({
    businessAddress,
    userAddress,
  }): number | null => {
    if (!businessAddress?.lat || !businessAddress.lon || !userAddress?.lat || !userAddress.lon) {
      return null;
    }

    const businessPosition: MapOlPosition = {
      lat: businessAddress.lat,
      lon: businessAddress.lon,
    };

    const userPosition: MapOlPosition = {
      lat: userAddress.lat,
      lon: userAddress.lon,
    };

    return getDistanceBetweenPositions(businessPosition, userPosition);
  };

  const getPrice: GetDeliveryUtilsReturn['getPrice'] = ({ distance, deliveryConfig }) => {
    if (isNullOrUndefined(distance)) return null;

    const { type } = deliveryConfig || {};

    switch (type) {
      case DeliveryConfigType.OPTIONAL:
      case DeliveryConfigType.REQUIRED: {
        const { price } = getDeliveryConfigPrice({
          deliveryConfig,
          distance,
        });

        return price;
      }
      default: {
        return 0;
      }
    }
  };

  return {
    getIsEnabled,
    getDistance,
    getPrice,
  };
};
