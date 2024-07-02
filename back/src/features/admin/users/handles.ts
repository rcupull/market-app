import { UserModel } from '../../../schemas/user';
import { RequestHandler } from '../../../types/general';
import { withTryCatch } from '../../../utils/error';
import { get200Response } from '../../../utils/server-response';
import { imagesServicesDeleteBulk } from '../../images/services';
import { userServicesUpdateOne } from '../../user/services';

import { specialAccessRecord } from './utils';

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
      await imagesServicesDeleteBulk({
        userId,
      });

      await UserModel.deleteOne({ _id: userId });

      res.send({});
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

      await userServicesUpdateOne({
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

export const adminUsersHandles = {
  get_users,
  del_users_userId,
  get_admin_access,
  put_admin_users_userId_access,
};
