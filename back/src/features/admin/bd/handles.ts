import { RequestHandler } from '../../../types/general';
import { withTryCatch } from '../../../utils/error';

const get_admin_bd_script: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      console.log('calling to bd script');
      // const users = await userServicesGetAll({
      //   query: {},
      // });

      // const promises = users.map((user)=>{

      //   return new Promise((resolve)=>{
      //       const asas=  user.address
      //   })
      // })

      res.send({});
    });
  };
};

export const bdHandles = {
  get_admin_bd_script,
};
