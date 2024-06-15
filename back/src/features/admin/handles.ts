import { RequestHandler } from '../../types/general';
import { withTryCatch } from '../../utils/error';
import { UserModel } from '../../schemas/user';
import { imagesServices } from '../images/services';

import { AdminConfigModel } from '../../schemas/admin';
import {
  get200Response,
  get400Response,
  getBillNotFoundResponse,
} from '../../utils/server-response';
import { billDataReshaper, specialAccessRecord } from './utils';
import { userServices } from '../user/services';
import { shoppingServices } from '../shopping/services';
import { billingServices } from '../billing/services';
import { Shopping } from '../../types/shopping';
import { getShoppingInfo } from '../shopping/utils';
import { deepJsonCopy, includesId } from '../../utils/general';

const get_users: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { paginateOptions } = req;

      const out = await UserModel.paginate(
        {
          role: { $in: ['user', 'admin'] },
        },
        paginateOptions
      );

      res.send(out);
    });
  };
};

const del_users_userId: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params } = req;
      const { userId } = params;

      /**
       * Remove all business images
       */
      await imagesServices.deleteImagesBy({
        userId,
      });

      await UserModel.deleteOne({ _id: userId });

      res.send({});
    });
  };
};

const get_admin_admin_config: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const config = await AdminConfigModel.findOne({});

      if (!config) {
        return get400Response({
          res,
          json: { message: 'No se ecuentra la configuracion principal' },
        });
      }

      res.send(config);
    });
  };
};

const put_admin_admin_config: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { body } = req;
      const { termsAndConditions, privacyPolicy } = body;

      const config = await AdminConfigModel.findOne({});

      if (!config) {
        return get400Response({
          res,
          json: { message: 'No se ecuentra la configuracion principal' },
        });
      }

      if (termsAndConditions) {
        config.termsAndConditions = termsAndConditions;
      }

      if (privacyPolicy) {
        config.privacyPolicy = privacyPolicy;
      }

      await config.save();

      res.send(config);
    });
  };
};

const get_admin_access: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      get200Response({
        res,
        json: {
          specialAccess: Object.keys(specialAccessRecord),
        },
      });
    });
  };
};

const put_admin_users_userId_access: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { body, params } = req;

      const { specialAccess = [] } = body;
      const { userId } = params;

      await userServices.updateOne({
        query: {
          _id: userId,
        },
        update: {
          specialAccess,
        },
      });

      get200Response({ res, json: {} });
    });
  };
};

const get_admin_shopping: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { query, paginateOptions } = req;

      const { routeNames, states } = query;

      const allBills = await billingServices.getAll({ query: {} });

      let out = await shoppingServices.getAllWithPagination({
        paginateOptions,
        query: {
          routeNames,
          states,
        },
      });

      out = deepJsonCopy(out);
      out.data = out.data.map((shopping) => {
        const bill = allBills.find(({ shoppingIds }) => shoppingIds.includes(shopping._id));

        if (bill) {
          return { ...shopping, billData: billDataReshaper(bill) };
        }

        return shopping;
      });

      res.send(out);
    });
  };
};

const post_admin_bills: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { body } = req;

      const { routeName, shoppingIds } = body;

      const shoppingData: Array<Shopping> = await shoppingServices.getAll({
        query: {
          _id: { $in: shoppingIds },
        },
      });

      const shoppingDebits = shoppingData.reduce(
        (acc, shopping) => acc + getShoppingInfo(shopping).shoppingDebit,
        0
      );

      const out = await billingServices.addOne({
        routeName,
        shoppingIds,
        totalDebit: shoppingDebits,
        state: 'PENDING_TO_PAY',
      });

      res.send(out);
    });
  };
};

const get_admin_bills: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { paginateOptions, query } = req;

      const { states, routeNames } = query;

      const bills = await billingServices.getAllWithPagination({
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

      const bill = await billingServices.getOne({
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

export const adminHandles = {
  get_users,
  del_users_userId,
  put_admin_admin_config,
  get_admin_admin_config,
  //
  get_admin_access,
  put_admin_users_userId_access,
  //
  get_admin_shopping,
  //
  post_admin_bills,
  get_admin_bills,
  //
  del_admin_bills_billId_shopping,
};
