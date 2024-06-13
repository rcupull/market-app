import { RequestHandler } from '../../types/general';
import { withTryCatch } from '../../utils/error';
import { UserModel } from '../../schemas/user';
import { imagesServices } from '../images/services';

import { AdminConfigModel } from '../../schemas/admin';
import { get200Response, get400Response } from '../../utils/server-response';
import { specialAccessRecord } from './utils';
import { userServices } from '../user/services';
import { shoppingServices } from '../shopping/services';

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

      const out = await shoppingServices.getAllWithPagination({
        paginateOptions,
        query: {
          routeNames,
          states,
        },
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
};
