import { RequestHandler } from '../../types/general';
import { withTryCatch } from '../../utils/error';

import { userServices } from './services';
import { User } from '../../types/user';
import { get404Response, getUserNotFoundResponse } from '../../utils/server-response';
import { ValidationCodeModel } from '../../schemas/auth';
import { imagesServicesDeleteOldImages } from '../images/services';

const get_users_userId: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params } = req;

      const { userId } = params;

      const out = await userServices.getOne({
        query: {
          _id: userId,
        },
      });

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
        const currentUser = await userServices.getOne({
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
      const out = await userServices.updateOne({
        query: {
          _id: userId,
        },
        update: body,
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

      await userServices.updateOne({
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

/**
 *  //////////////////////////////////////////POSTS
 */

export const userHandles = {
  get_users_userId,
  put_users_userId,
  post_user_userId_chatbot_validate,
};
