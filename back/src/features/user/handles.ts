import { RequestHandler } from '../../types/general';
import { withTryCatch } from '../../utils/error';

import {
  userServicesGetAllWithPagination,
  userServicesGetOne,
  userServicesUpdateOne
} from './services';
import { User, UserChecks, UserDto } from '../../types/user';
import { get400Response, getUserNotFoundResponse } from '../../utils/server-response';
import { imagesServicesDeleteOldImages } from '../images/services';
import { makeReshaper } from '../../utils/makeReshaper';
import { deepJsonCopy, includesId } from '../../utils/general';
import { businessServicesGetAll } from '../business/services';
import { Business } from '../../types/business';

const get_users_delivery_man: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { paginateOptions } = req;

      const out = await userServicesGetAllWithPagination({
        paginateOptions,
        query: {
          canMakeDeliveries: true
        }
      });

      res.send(out);
    });
  };
};

const get_users_userId: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params } = req;

      const { userId } = params;

      const response = await userServicesGetOne({
        query: {
          _id: userId
        }
      });

      if (!response) {
        return getUserNotFoundResponse({ res });
      }

      const businessData: Array<Pick<Business, 'routeName' | 'name' | 'favoritesUserIds'>> =
        await businessServicesGetAll({
          query: {
            favoritesUserIds: { $in: userId }
          },
          projection: {
            name: 1,
            routeName: 1,
            favoritesUserIds: 1
          }
        });

      const getFavoritesBusiness = () => {
        return businessData.reduce(
          (acc, { favoritesUserIds = [], name, routeName }) => {
            const isFavorite = includesId(favoritesUserIds, userId);

            if (isFavorite) {
              return [
                ...acc,
                {
                  name,
                  routeName
                }
              ];
            }

            return acc;
          },
          [] as Array<{
            name: string;
            routeName: string;
          }>
        );
      };

      const getUserDto = async (user: User): Promise<UserDto> => {
        return {
          ...user,
          favoritesBusiness: getFavoritesBusiness()
        };
      };

      const out = await getUserDto(deepJsonCopy(response));
      res.send(out);
    });
  };
};

const put_users_userId: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params, body } = req;

      const { userId } = params;

      const { profileImage } = body as User;

      /**
       * Delete old profile image
       */
      if (profileImage) {
        const currentUser = await userServicesGetOne({
          query: {
            _id: userId
          }
        });

        if (!currentUser) {
          return getUserNotFoundResponse({ res });
        }

        if (currentUser.profileImage) {
          await imagesServicesDeleteOldImages({
            newImagesSrcs: [profileImage],
            oldImagesSrcs: [currentUser.profileImage]
          });
        }
      }

      /**
       * Update
       */

      /**
       * The user can not remove this option. He can set to tru. Only the admin can change to false
       */
      if (body.canCreateBusiness === false || body.canCreateBusiness === null) {
        delete body.canCreateBusiness;
      }

      /**
       * The user can not remove this option. He can set to tru. Only the admin can change to false
       */
      if (body.canMakeDeliveries === false || body.canMakeDeliveries === null) {
        delete body.canMakeDeliveries;
      }

      const out = await userServicesUpdateOne({
        query: {
          _id: userId
        },
        update: makeReshaper<User, User>({
          name: 'name',
          profileImage: 'profileImage',
          phone: 'phone',
          addresses: 'addresses',
          canCreateBusiness: 'canCreateBusiness',
          canMakeDeliveries: 'canMakeDeliveries'
        })(body)
      });

      res.send(out);
    });
  };
};

const put_users_userId_checks: () => RequestHandler = () => {
  return async (req, res) => {
    withTryCatch(req, res, async () => {
      const { body, user } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const newChecks = makeReshaper<UserChecks, UserChecks>({
        requestUserTypeWhenStart: 'requestUserTypeWhenStart'
      })(body);

      await userServicesUpdateOne({
        query: {
          _id: user._id
        },
        update: {
          checks: {
            ...(user.checks || {}),
            ...Object.keys(newChecks).reduce((acc, key) => ({ ...acc, [key]: true }), {})
          }
        }
      });

      res.send({});
    });
  };
};

const post_users_userId_delivery_business: () => RequestHandler = () => {
  return async (req, res) => {
    withTryCatch(req, res, async () => {
      const { body, params } = req;
      const { userId } = params;
      const { routeName } = body;

      const deliveryMan = await userServicesGetOne({
        query: {
          _id: userId,
          canMakeDeliveries: true
        }
      });

      if (!deliveryMan) {
        return getUserNotFoundResponse({ res });
      }

      const hasBusiness = deliveryMan.deliveryBusiness
        ? deliveryMan.deliveryBusiness.some((business) => business.routeName === routeName)
        : false;

      if (hasBusiness) {
        return get400Response({
          res,
          json: {
            message: 'This user has this bussiness'
          }
        });
      }

      await userServicesUpdateOne({
        query: {
          _id: userId
        },
        update: {
          deliveryBusiness: [
            ...(deliveryMan.deliveryBusiness || []),
            {
              routeName
            }
          ]
        }
      });

      res.send({});
    });
  };
};

const del_users_userId_delivery_business: () => RequestHandler = () => {
  return async (req, res) => {
    withTryCatch(req, res, async () => {
      const { body, params } = req;
      const { userId } = params;
      const { routeName } = body;

      const deliveryMan = await userServicesGetOne({
        query: {
          _id: userId,
          canMakeDeliveries: true
        }
      });

      if (!deliveryMan) {
        return getUserNotFoundResponse({ res });
      }

      const hasBusiness = deliveryMan.deliveryBusiness
        ? deliveryMan.deliveryBusiness.some((business) => business.routeName === routeName)
        : false;

      if (!hasBusiness || !deliveryMan.deliveryBusiness) {
        return res.send({});
      }

      await userServicesUpdateOne({
        query: {
          _id: userId
        },
        update: {
          deliveryBusiness: deliveryMan.deliveryBusiness.filter(
            (business) => business.routeName !== routeName
          )
        }
      });

      res.send({});
    });
  };
};

export const userHandles = {
  get_users_userId,
  put_users_userId,
  put_users_userId_checks,
  //
  post_users_userId_delivery_business,
  del_users_userId_delivery_business,
  //
  get_users_delivery_man
};
