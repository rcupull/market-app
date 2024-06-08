import { RequestHandler } from '../../types/general';
import { withTryCatch } from '../../utils/error';
import { ServerResponse } from 'http';
import { imagesServices } from '../images/services';
import { userServices } from './services';
import { User } from '../../types/user';
import { getUserNotFoundResponse } from '../../utils/server-response';

const get_users_userId: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { params, cookies } = req;

      const { userId } = params;

      const out = await userServices.getOne({
        query: {
          _id: userId,
        },
      });

      if (out instanceof ServerResponse) return;

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

        if (currentUser instanceof ServerResponse) return currentUser;

        if (!currentUser) {
          return getUserNotFoundResponse({ res });
        }

        if (currentUser.profileImage) {
          await imagesServices.deleteOldImages({
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

      if (out instanceof ServerResponse) return out;

      res.send(out);
    });
  };
};

/**
 *  //////////////////////////////////////////POSTS
 */

export const userHandles = {
  get_users_userId,
  put_users_userId,
};
