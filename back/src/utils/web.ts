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

export const getBusinessUrl = ({ routeName }: { routeName: string }) => {
  return `${hostname}/b/${routeName}`;
};

export const getBusinessOrdersTagUrl = ({ routeName }: { routeName: string }) => {
  return `${hostname}/business/${routeName}?bussinessTab=shopping`;
};
