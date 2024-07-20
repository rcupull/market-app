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

export const getBusinessOrdersTagUrl = ({ routeName }: { routeName: string }) => {
  return `${hostname}/dashboard/business/${routeName}?bussinessTab=shopping&state=REQUESTED`;
};
