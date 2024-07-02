import { RequestHandler } from '../../../types/general';
import { Shopping } from '../../../types/shopping';
import { withTryCatch } from '../../../utils/error';
import { includesId } from '../../../utils/general';
import { get400Response, getBillNotFoundResponse } from '../../../utils/server-response';
import {
  billingServicesAddOne,
  billingServicesDeleteOne,
  billingServicesGetAllWithPagination,
  billingServicesGetBillDataFromShopping,
  billingServicesGetOne,
} from '../../billing/services';
import { shoppingServicesGetAll } from '../../shopping/services';
import { getShoppingsTotalDebit } from '../../shopping/utils';

const post_admin_bills: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { body } = req;

      const { routeName, shoppingIds, dateFrom, dateTo, states } = body;

      const { getAllShopingIds } = await billingServicesGetBillDataFromShopping({
        query: { routeNames: [routeName] },
      });

      // get shopping
      const shoppings: Array<Shopping> = await shoppingServicesGetAll({
        query: {
          routeName,
          shoppingIds,
          dateFrom,
          dateTo,
          states,
          excludeShoppingIds: getAllShopingIds(),
        },
      });

      const totalDebit = getShoppingsTotalDebit(shoppings);

      // create new bill
      const newBill = await billingServicesAddOne({
        routeName,
        shoppingIds: shoppings.map(({ _id }) => _id),
        totalDebit,
        state: 'PENDING_TO_PAY',
      });

      res.send(newBill);
    });
  };
};

const get_admin_bills: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { paginateOptions, query } = req;

      const { states, routeNames } = query;

      const bills = await billingServicesGetAllWithPagination({
        paginateOptions,
        query: {
          routeNames,
          states,
        },
      });

      res.send(bills);
    });
  };
};

const del_admin_bills_billId_shopping: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { body, params } = req;

      const { shoppingIds } = body;
      const { billId } = params;

      const bill = await billingServicesGetOne({
        query: {
          _id: billId,
        },
      });

      if (!bill) {
        return getBillNotFoundResponse({ res });
      }

      if (bill.state !== 'PENDING_TO_PAY') {
        return get400Response({
          res,
          json: {
            message: 'The bill was already paid or canceled',
          },
        });
      }

      const newShoppingIds = bill.shoppingIds.filter((id) => !includesId(shoppingIds, id));

      if (newShoppingIds.length === 0) {
        /**
         * if the bil has no more shopping, we can delete it
         */
        await bill.deleteOne();
      } else {
        /**
         * Update the bill
         */
        bill.shoppingIds = newShoppingIds;
        await bill.save();
      }

      res.send({});
    });
  };
};

const del_admin_bills_billId: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params } = req;

      const { billId } = params;

      await billingServicesDeleteOne({
        query: {
          _id: billId,
        },
      });

      res.send({});
    });
  };
};

export const adminBillsHandles = {
  post_admin_bills,
  get_admin_bills,
  del_admin_bills_billId_shopping,
  del_admin_bills_billId,
};
