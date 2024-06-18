import { RequestHandler } from '../../../types/general';
import { User } from '../../../types/user';
import { withTryCatch } from '../../../utils/error';
import { deepJsonCopy, isEqualIds } from '../../../utils/general';
import { businessServices } from '../../business/services';
import { userServices } from '../../user/services';

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

export const adminBusinessHandles = {
  delete_admin_business_routeName,
  get_admin_business,
};
