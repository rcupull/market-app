import { RequestHandler } from '../../types/general';
import { withTryCatch } from '../../utils/error';

import { userServicesGetOne, userServicesUpdateOne } from './services';
import { User, UserChecks, UserDto } from '../../types/user';
import {
  get400Response,
  get404Response,
  getUserNotFoundResponse,
} from '../../utils/server-response';
import { ValidationCodeModel } from '../../schemas/auth';
import { imagesServicesDeleteOldImages } from '../images/services';
import { makeReshaper } from '../../utils/makeReshaper';
import { deepJsonCopy } from '../../utils/general';
import { businessServicesGetAll } from '../business/services';
import { Business } from '../../types/business';

const get_users_userId: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params } = req;

      const { userId } = params;

      const response = await userServicesGetOne({
        query: {
          _id: userId,
        },
      });

      if (!response) {
        return getUserNotFoundResponse({ res });
      }

      const businessData: Array<Pick<Business, 'routeName' | 'name'>> =
        await businessServicesGetAll({
          query: {
            routeNames: response.favoritesBusinessRouteNames,
          },
          projection: {
            name: 1,
            routeName: 1,
          },
        });

      const getUserDto = async (user: User): Promise<UserDto> => {
        return {
          ...user,
          favoritesBusinessNames: user.favoritesBusinessRouteNames?.map((routeName) => {
            const business = businessData.find((b) => routeName === b.routeName);
            return business?.name || '<unknown name>';
          }),
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
            _id: userId,
          },
        });

        if (!currentUser) {
          return getUserNotFoundResponse({ res });
        }

        if (currentUser.profileImage) {
          await imagesServicesDeleteOldImages({
            newImagesSrcs: [profileImage],
            oldImagesSrcs: [currentUser.profileImage],
          });
        }
      }

      /**
       * Update
       */

      /**
       * The user can not remove this option. Only the admin can
       */
      if (body.canCreateBusiness === false || body.canCreateBusiness === null) {
        return get400Response({
          res,
          json: {
            message: 'The user can not remove canCreateBusiness option',
          },
        });
      }

      /**
       * The user can not remove this option. Only the admin can
       */
      if (body.canMakeDeliveries === false || body.canMakeDeliveries === null) {
        return get400Response({
          res,
          json: {
            message: 'The user can not remove canMakeDeliveries option',
          },
        });
      }

      const out = await userServicesUpdateOne({
        query: {
          _id: userId,
        },
        update: makeReshaper<User, User>({
          name: 'name',
          profileImage: 'profileImage',
          phone: 'phone',
          addresses: 'addresses',
          canCreateBusiness: 'canCreateBusiness',
          canMakeDeliveries: 'canMakeDeliveries',
        })(body),
      });

      res.send(out);
    });
  };
};

const post_user_userId_chatbot_validate: () => RequestHandler = () => {
  return async (req, res) => {
    withTryCatch(req, res, async () => {
      const { body, user } = req;
      const { code } = body;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const validationCode = await ValidationCodeModel.findOneAndDelete({
        code,
      });

      if (!validationCode) {
        return get404Response({
          res,
          json: {
            message:
              'Este codigo de validación no existe o ya el bot fue verificado con este código',
          },
        });
      }

      const { meta } = validationCode.toJSON();

      if (!meta) {
        return get404Response({
          res,
          json: {
            message: 'No hay metadatos disponibles en este codigo de validación del bot',
          },
        });
      }

      await userServicesUpdateOne({
        query: {
          _id: user._id,
        },
        update: {
          telegramBotChat: meta,
        },
      });

      res.send({});
    });
  };
};

const put_user_userId_checks: () => RequestHandler = () => {
  return async (req, res) => {
    withTryCatch(req, res, async () => {
      const { body, user } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const newChecks = makeReshaper<UserChecks, UserChecks>({
        requestUserTypeWhenStart: 'requestUserTypeWhenStart',
      })(body);

      await userServicesUpdateOne({
        query: {
          _id: user._id,
        },
        update: {
          checks: {
            ...(user.checks || {}),
            ...Object.keys(newChecks).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
          },
        },
      });

      res.send({});
    });
  };
};

/**
 *  //////////////////////////////////////////POSTS
 */

const post_users_userId_favorite_business: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params, body } = req;

      const { userId } = params;
      const { routeName } = body;

      await userServicesUpdateOne({
        query: {
          _id: userId,
        },
        update: {
          $push: {
            favoritesBusinessRouteNames: routeName,
          },
        },
      });

      res.send({});
    });
  };
};

const del_users_userId_favorite_business: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params, body } = req;

      const { userId } = params;
      const { routeName } = body;

      await userServicesUpdateOne({
        query: {
          _id: userId,
        },
        update: {
          $pull: {
            favoritesBusinessRouteNames: routeName,
          },
        },
      });

      res.send({});
    });
  };
};

export const userHandles = {
  get_users_userId,
  put_users_userId,
  post_user_userId_chatbot_validate,
  //
  post_users_userId_favorite_business,
  del_users_userId_favorite_business,
  put_user_userId_checks,
};
