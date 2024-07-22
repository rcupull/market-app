//eslint-disable-next-line
//@ts-nocheck asdasd
import { RequestHandler } from '../../../types/general';
import { withTryCatch } from '../../../utils/error';
import { businessServicesGetAll, businessServicesUpdateOne } from '../../business/services';

const get_admin_bd_script: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      console.log('calling to bd script');
      const business = await businessServicesGetAll({
        query: {},
      });

      const promises = business.map((business) => {
        return new Promise<void>((resolve) => {
          const doneOnboarding = business.toJSON().doneOnboarding;

          if (doneOnboarding) {
            businessServicesUpdateOne({
              query: {
                routeName: business.routeName,
              },
              update: {
                checks: { doneOnboarding: true },
              },
            }).then(() => {
              resolve();
            });
          } else {
            resolve();
          }
        });
      });

      await Promise.all(promises);

      // await userServicesUpdateAll({
      //   query: {},
      //   update: {
      //     checks: { requestUserTypeWhenStart: true },
      //   },
      // });

      res.send({});
    });
  };
};

export const bdHandles = {
  get_admin_bd_script,
};
