import { RequestHandler } from '../../../types/general';
import { defaultQuerySort } from '../../../utils/api';
import { withTryCatch } from '../../../utils/error';
import { deepJsonCopy } from '../../../utils/general';
import { billingServices } from '../../billing/services';
import { shoppingServicesGetAllWithPagination } from '../../shopping/services';
import { Shopping, ShoppingDto } from '../../../types/shopping';
import { getShoppingWasAcceptedQuery } from '../../../utils/schemas';
import { userServices } from '../../user/services';

const get_admin_shopping: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { query, paginateOptions } = req;

      const {
        routeNames,
        hasBill,
        states,
        dateFrom,
        dateTo,
        sort = defaultQuerySort,
        wasAccepted,
      } = query;

      const { getAllShopingIds, getOneShoppingBillData } =
        await billingServices.getBillDataFromShopping({
          query: { routeNames },
        });

      const shoppings = await shoppingServicesGetAllWithPagination({
        paginateOptions,
        sort,
        query: {
          ...(hasBill === 'true' ? { shoppingIds: getAllShopingIds() } : {}),
          ...(hasBill === 'false' ? { excludeShoppingIds: getAllShopingIds() } : {}),
          ...(wasAccepted === 'true' ? getShoppingWasAcceptedQuery() : {}),
          routeNames,
          states,
          dateFrom,
          dateTo,
        },
      });

      const out = deepJsonCopy(shoppings);

      const { getOneShoppingUserData } = await userServices.getUserDataFromShopping({
        query: { _id: { $in: out.data.map(({ purchaserId }) => purchaserId) } },
      });

      const getShoppingDto = async (shopping: Shopping): Promise<ShoppingDto> => {
        const billData = getOneShoppingBillData(shopping);
        const purchaserData = getOneShoppingUserData(shopping);

        return {
          ...shopping,
          billId: billData?.billId,
          billState: billData?.billState,

          purchaserName: purchaserData?.purchaserName,
          purchaserAddress: purchaserData?.purchaserAddress,
          purchaserPhone: purchaserData?.purchaserPhone,
        };
      };

      const promises = out.data.map(getShoppingDto);
      out.data = await Promise.all(promises);

      res.send(out);
    });
  };
};

export const adminShoppingHandles = {
  get_admin_shopping,
};
