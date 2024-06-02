import { RequestHandler } from '../../types/general';
import { uploadImageMiddleware } from '../../middlewares/files';
import { isNumber } from '../../utils/general';
import { withTryCatch } from '../../utils/error';
import { imagesServices } from './services';
import { ServerResponse } from 'http';
import { get200Response, get400Response } from '../../utils/server-response';
import { getAssetsDir } from '../../config';
import sharp from 'sharp';
import { getFullFileNameToSave } from './utils';
import path from 'path';
import fs from 'fs';

const save_image: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      uploadImageMiddleware(req, res, async (err) => {
        if (err) {
          return get400Response({ res, json: { message: err.message } });
        }

        const filename = getFullFileNameToSave({
          userId: req.query.userId,
          postId: req.query.postId,
          routeName: req.query.routeName,
        });

        const { width, height } = req.query;

        if (!filename) {
          return get400Response({
            res,
            json: { message: 'has not filename' },
          });
        }

        const { file } = req;

        if (!file) {
          return get400Response({
            res,
            json: { message: 'Has not file' },
          });
        }

        const webImagePathNameFilename = `${filename}-${path.parse(file.path).name}.web`;

        const realWidth = width && isNumber(Number(width)) ? Number(width) : undefined;
        const realHeight = height && isNumber(Number(height)) ? Number(height) : undefined;

        await sharp(file.path).resize(realWidth, realHeight).toFile(webImagePathNameFilename);

        fs.unlinkSync(file.path);

        return get200Response({
          res,
          json: {
            imageSrc: webImagePathNameFilename.replace(getAssetsDir(), ''),
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

      const out = await imagesServices.deleteOne({ src: imageSrc, res, req });

      if (out instanceof ServerResponse) return out;

      get200Response({
        res,
        json: {},
      });
    });
  };
};

export const imageHandles = {
  save_image,
  delete_one_image,
};
