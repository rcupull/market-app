//eslint-disable-next-line
//@ts-nocheck asdasd
import { RequestHandler } from '../../../types/general';
import { withTryCatch } from '../../../utils/error';
import { userServicesUpdateAll } from '../../user/services';

const get_admin_bd_script: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      console.log('calling to bd script');
      // const users = await userServicesGetAll({
      //   query: {},
      // });

      // const promises = users.map((user) => {
      //   return new Promise<void>((resolve) => {
      //     const address = user.toJSON().address;

      //     if (address) {
      //       userServicesUpdateOne({
      //         query: {
      //           _id: user._id,
      //         },
      //         update: {
      //           $set: {
      //             addresses: [address],
      //           },
      //           $unset: {
      //             address: 1,
      //           },
      //         },
      //       }).then(() => {
      //         resolve();
      //       });
      //     } else {
      //       resolve();
      //     }
      //   });
      // });

      // await Promise.all(promises);

      await userServicesUpdateAll({
        query: {},
        update: {
          checks: { requestUserTypeWhenStart: true },
        },
      });

      res.send({});
    });
  };
};

export const bdHandles = {
  get_admin_bd_script,
};
