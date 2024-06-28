import { RequestHandler } from '../../../types/general';
import { defaultQuerySort } from '../../../utils/api';
import { withTryCatch } from '../../../utils/error';
import { deepJsonCopy } from '../../../utils/general';
import { billingServices } from '../../billing/services';
import { shoppingServices } from '../../shopping/services';
import { Shopping, ShoppingDto } from '../../../types/shopping';

const get_admin_shopping: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { query, paginateOptions } = req;

      const { routeNames, hasBill, states, dateFrom, dateTo, sort = defaultQuerySort } = query;

      const { getAllShopingIds, getOneShoppingBillData } =
        await billingServices.getBillDataFromShoppingV2({
          query: { routeNames },
        });

      const shoppings = await shoppingServices.getAllWithPagination({
        paginateOptions,
        sort,
        query: {
          ...(hasBill === 'true' ? { shoppingIds: getAllShopingIds() } : {}),
          ...(hasBill === 'false' ? { excludeShoppingIds: getAllShopingIds() } : {}),
          routeNames,
          states,
          dateFrom,
          dateTo,
        },
      });

      const getShoppingDto = async (shopping: Shopping): Promise<ShoppingDto> => {
        const billData = getOneShoppingBillData(shopping);

        if (!billData) {
          return shopping;
        }

        return {
          ...shopping,
          billId: billData.billId,
          billState: billData.billState,
        };
      };

      const out = deepJsonCopy(shoppings);
      const promises = out.data.map(getShoppingDto);
      out.data = await Promise.all(promises);

      res.send(out);
    });
  };
};

export const adminShoppingHandles = {
  get_admin_shopping,
};
