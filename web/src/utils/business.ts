import { queryToSearch } from 'hooks/useRouter/utils';

import { deepJsonCopy, replaceAll } from './general';

import { Business, SearchLayoutType } from 'types/business';
import { Post } from 'types/post';
import { Shopping } from 'types/shopping';

export const getRouteName = (name: string): string => {
  let out = name.trim().toLowerCase();
  out = replaceAll(out, ' ', '-');
  out = out.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // remove accents
  return out;
};

export const getPostCategoryTag = (label: string): string => {
  let out = label.trim().toLowerCase();
  out = replaceAll(out, ' ', '_');
  out = out.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // remove accents
  return out;
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
  return `${getBusinessRoute({ routeName: args.routeName })}/posts`;
};

export const getShoppingRoute = (args: { routeName: string }) => {
  return `${getBusinessRoute({ routeName: args.routeName })}/shopping`;
};
export const getOneShoppingRoute = (args: { routeName: string; shoppingId: string }) => {
  return `${getBusinessRoute({ routeName: args.routeName })}/shopping/${args.shoppingId}`;
};

export const getBusinessRoute = (args: { routeName: string }) => {
  return `/b/${args.routeName}`;
};

export const getBusinessAboutUsRoute = (args: { routeName: string }) => {
  return `${getBusinessRoute({ routeName: args.routeName })}/about-us`;
};

export const getDashboardBusinessRoute = (args: { routeName: string }) => {
  return `/dashboard/business/${args.routeName}`;
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
      return 'Izquierda';
    case 'center':
      return 'Centrado';
    case 'right':
      return 'Derecha';
    case 'postCategories':
      return 'Categorías(seleccion múltiple)';
    case 'postCategoriesScrollable':
      return 'Categorías(seleccion múltiple y deslizables)';
    case 'postCategoriesExcluded':
      return 'Categorías(seleccion simple)';
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
