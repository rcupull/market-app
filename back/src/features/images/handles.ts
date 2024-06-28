import { RequestHandler } from '../../types/general';
import { uploadImageMiddleware } from '../../middlewares/files';
import { withTryCatch } from '../../utils/error';

import {
  get200Response,
  get400Response,
  getUserNotFoundResponse,
} from '../../utils/server-response';
import { imagesServices } from './services';

const post_images: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      uploadImageMiddleware(req, res, async (err) => {
        if (err) {
          return get400Response({ res, json: { message: err.message } });
        }

        const { file } = req;

        if (!file) {
          return get400Response({
            res,
            json: { message: 'Has not file' },
          });
        }

        const response = await imagesServices.uploadFile({
          file,
          userId: req.query.userId,
          postId: req.query.postId,
          routeName: req.query.routeName,
        });

        if (!response) {
          return get400Response({
            res,
            json: {
              message: 'Some problem saving the image',
            },
          });
        }

        return get200Response({
          res,
          json: {
            imageSrc: response.result.id,
          },
        });
      });
    });
  };
};

const post_image_checkeditor: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      uploadImageMiddleware(req, res, async (err) => {
        if (err) {
          return get400Response({ res, json: { message: err.message } });
        }
        const { query, user } = req;
        if (!user) {
          return getUserNotFoundResponse({ res });
        }

        const { postId, routeName } = query;

        const { file } = req;

        if (!file) {
          return get400Response({
            res,
            json: { message: 'Has not file' },
          });
        }

        const response = await imagesServices.uploadFile({
          file,
          userId: user._id.toString(),
          postId,
          routeName,
        });

        if (!response) {
          return get400Response({
            res,
            json: {
              message: 'Some problem saving the image',
            },
          });
        }

        return get200Response({
          res,
          json: {
            url: response.result.variants[0],
            uploaded: 1,
          },
        });
      });
    });
  };
};

const delete_one_image: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { imageSrc } = req.body;

      await imagesServices.deleteOne({ src: imageSrc });

      get200Response({
        res,
        json: {},
      });
    });
  };
};

const delete_images: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      const { srcs } = req.body;

      await imagesServices.deleteMany({ srcs });

      get200Response({
        res,
        json: {},
      });
    });
  };
};

export const imageHandles = {
  post_images,
  delete_one_image,
  //
  post_image_checkeditor,
  delete_images,
};
