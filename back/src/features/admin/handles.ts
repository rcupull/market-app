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
import { combineMiddleware, deepJsonCopy, includesId, isEqualIds } from '../../utils/general';
import { agendashMiddleware } from '../agenda/middlware';
import { secretAgendaToken } from '../../config';
import { businessServices } from '../business/services';
import { User } from '../../types/user';

const get_users: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { paginateOptions } = req;

      const out = await UserModel.paginate(
        {
          role: { $in: ['user', 'admin'] },
        },
        paginateOptions,
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
      const { termsAndConditions, privacyPolicy, price } = body;

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

      if (price) {
        config.price = price;
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

      const { routeNames, states, dateFrom, dateTo, sort = '-createdAt' } = query;

      const allBills = await billingServices.getAll({ query: {} });

      let out = await shoppingServices.getAllWithPagination({
        paginateOptions,
        sort,
        query: {
          routeNames,
          states,
          dateFrom,
          dateTo,
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

      const { routeName, shoppingIds, dateFrom, dateTo, states } = body;

      const shoppingData: Array<Shopping> = await shoppingServices.getAll({
        query: {
          routeName,
          shoppingIds,
          dateFrom,
          dateTo,
          states,
        },
      });

      const shoppingDebits = shoppingData.reduce(
        (acc, shopping) => acc + getShoppingInfo(shopping).shoppingDebit,
        0,
      );

      const out = await billingServices.addOne({
        routeName,
        shoppingIds: shoppingData.map(({ _id }) => _id),
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

const get_admin_agenda_token: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      res.send({ agendaToken: secretAgendaToken });
    });
  };
};

const use_admin_agenda_web: () => RequestHandler = () =>
  combineMiddleware((req, res, next) => {
    const token = req.params.token;

    if (token === secretAgendaToken) {
      next();
    } else {
      return get400Response({ res, json: { message: 'Token not exists' } });
    }
  }, agendashMiddleware);

const delete_admin_business_routeName: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params } = req;

      const { routeName } = params;

      await businessServices.deleteOne({
        routeName,
      });

      res.send();
    });
  };
};

const get_admin_business: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { paginateOptions, query } = req;

      const { routeNames, search, userId } = query;

      let out = await businessServices.getAllWithPagination({
        paginateOptions,
        query: {
          routeNames,
          search,
          createdBy: userId,
        },
      });

      const usersData: Array<Pick<User, 'name' | '_id'>> = await userServices.getAll({
        query: {
          _id: { $in: out.data.map(({ createdBy }) => createdBy) },
        },
        projection: {
          name: 1,
          _id: 1,
        },
      });

      out = deepJsonCopy(out);
      out.data = out.data.map((business) => {
        const { createdBy } = business;
        const userData = usersData.find((user) => isEqualIds(user._id, createdBy));

        if (userData) {
          const { name } = userData;
          return {
            ...business,
            userData: {
              name,
            },
          };
        }

        return business;
      });

      res.send(out);
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
  //
  get_admin_agenda_token,
  use_admin_agenda_web,
  //
  delete_admin_business_routeName,
  get_admin_business,
};
