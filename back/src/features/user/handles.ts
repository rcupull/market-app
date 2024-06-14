import { RequestHandler } from '../../types/general';
import { withTryCatch } from '../../utils/error';

import { imagesServices } from '../images/services';
import { userServices } from './services';
import { User } from '../../types/user';
import { getUserNotFoundResponse } from '../../utils/server-response';

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
