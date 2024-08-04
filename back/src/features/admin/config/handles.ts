import { AdminConfigModel } from '../../../schemas/admin';
import { RequestHandler } from '../../../types/general';
import { withTryCatch } from '../../../utils/error';
import { get400Response } from '../../../utils/server-response';

const get_admin_admin_config: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const config = await AdminConfigModel.findOne({});

      if (!config) {
        return get400Response({
          res,
          json: { message: 'No se ecuentra la configuracion principal' }
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
      const { termsAndConditions, privacyPolicy, price, features } = body;

      const config = await AdminConfigModel.findOne({});

      if (!config) {
        return get400Response({
          res,
          json: { message: 'No se ecuentra la configuracion principal' }
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

      if (features) {
        config.features = features;
      }

      await config.save();

      res.send(config);
    });
  };
};

export const adminConfigHandles = {
  put_admin_admin_config,
  get_admin_admin_config
};
