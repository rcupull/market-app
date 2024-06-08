import { RequestHandler } from '../../types/general';
import { withTryCatch } from '../../utils/error';
import { UserModel } from '../../schemas/user';
import { imagesServices } from '../images/services';
import { ServerResponse } from 'http';
import { AdminConfigModel } from '../../schemas/admin';
import { get400Response } from '../../utils/server-response';

const get_users: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { paginateOptions } = req;

      const out = await UserModel.paginate(
        {
          role: 'user',
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
      const out = await imagesServices.deleteImagesBy({
        userId,
      });

      if (out instanceof ServerResponse) return out;

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

export const adminHandles = {
  get_users,
  del_users_userId,
  put_admin_admin_config,
  get_admin_admin_config,
};
