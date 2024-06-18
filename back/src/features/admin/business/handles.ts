import { Business } from '../../../types/business';
import { RequestHandler } from '../../../types/general';
import { Post } from '../../../types/post';
import { User } from '../../../types/user';
import { withTryCatch } from '../../../utils/error';
import { deepJsonCopy, isEqualIds } from '../../../utils/general';
import { businessServices } from '../../business/services';
import { postServices } from '../../post/services';
import { userServices } from '../../user/services';

const delete_admin_business_routeName: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params } = req;

      const { routeName } = params;

      /**
       * Delete the business, business images, posts, and billing
       */
      await businessServices.deleteOne({
        routeName,
      });

      res.send();
    });
  };
};

interface BusinessAdminDto extends Business {
  userData?: Pick<User, 'name'>;
  postCount?: number;
}
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

      const postsData: Array<Pick<Post, 'routeName'>> = await postServices.getAll({
        query: {
          routeName: { $in: out.data.map(({ routeName }) => routeName) },
        },
        projection: {
          routeName: 1,
        },
      });

      out = deepJsonCopy(out);

      const handleResolveBusinessDto = async (business: Business): Promise<BusinessAdminDto> => {
        const out: BusinessAdminDto = business;

        const { createdBy } = out;

        const userData = usersData.find((user) => isEqualIds(user._id, createdBy));

        if (userData) {
          out.userData = {
            name: userData.name,
          };
        }

        const ownPosts = postsData.filter(({ routeName }) => routeName === out.routeName);

        out.postCount = ownPosts.length;
        return out;
      };

      const promises = out.data.map((business) => {
        return new Promise<BusinessAdminDto>((resolve) => {
          handleResolveBusinessDto(business).then(resolve);
        });
      });

      out.data = await Promise.all(promises);

      res.send(out);
    });
  };
};

export const adminBusinessHandles = {
  delete_admin_business_routeName,
  get_admin_business,
};
