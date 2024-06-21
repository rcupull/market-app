import { hostname } from '../config';

export const getShoppingUrl = ({
  routeName,
  shoppingId,
}: {
  routeName: string;
  shoppingId: string;
}) => {
  return `${hostname}/b/${routeName}/shopping/${shoppingId}`;
};
