import { RequestHandler } from '../../../types/general';
import { defaultQuerySort } from '../../../utils/api';
import { withTryCatch } from '../../../utils/error';
import { deepJsonCopy } from '../../../utils/general';
import { billingServices } from '../../billing/services';
import { shoppingServices } from '../../shopping/services';

const get_admin_shopping: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { query, paginateOptions } = req;

      const { routeNames, hasBill, states, dateFrom, dateTo, sort = defaultQuerySort } = query;

      const allBills = await billingServices.getAll({ query: {} });

      let out = await shoppingServices.getAllWithPagination({
        paginateOptions,
        sort,
        query: {
          routeNames,
          states,
          dateFrom,
          dateTo,
          ...(hasBill ? { billId: { $exists: hasBill === 'true' } } : {}),
        },
      });

      out = deepJsonCopy(out);
      out.data = out.data.map((shopping) => {
        const bill = allBills.find(({ shoppingIds }) => shoppingIds.includes(shopping._id));

        if (bill) {
          return { ...shopping, billState: bill.state };
        }

        return shopping;
      });

      res.send(out);
    });
  };
};

export const adminShoppingHandles = {
  get_admin_shopping,
};
