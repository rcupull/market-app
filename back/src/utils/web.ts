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

export const getBusinessShoppingUrl = ({ routeName }: { routeName: string }) => {
  return `${getBusinessUrl({ routeName })}?bussinessTab=shopping`;
};
