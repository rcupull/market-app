import { RequestHandler } from "../../types/general";
import { uploadImageMiddleware } from "../../middlewares/files";
import { combineMiddleware, isNumber } from "../../utils/general";
import { withTryCatch } from "../../utils/error";
import { imagesServices } from "./services";
import { ServerResponse } from "http";
import {
  get200Response,
  get400Response,
  get500Response,
} from "../../utils/server-response";
import { getAssetsDir } from "../../config";
import sharp from "sharp";
import { getDirPathNameToUpload } from "./utils";
import path from "path";
import fs from "fs";

interface ResizeArgs {
  widthOrOptions?: number | sharp.ResizeOptions | null;
  height?: number | null;
  options?: sharp.ResizeOptions;
}

const save_image: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      uploadImageMiddleware(req, res, async (err) => {
        if (err) {
          return get400Response({ res, json: { message: err.message } });
        }

        const dirPathName = getDirPathNameToUpload({ req });
        const { width, height } = req.query;

        if (!dirPathName) {
          return get400Response({
            res,
            json: { message: "has not dirPathName" },
          });
        }

        const { file } = req;

        if (!file) {
          return get400Response({
            res,
            json: { message: "Has not file" },
          });
        }

        const webImagePathName = path.join(
          dirPathName,
          `${Date.now()}-${path.parse(file.path).name}.web`
        );

        const realWidth =
          width && isNumber(Number(width)) ? Number(width) : undefined;
        const realHeight =
          height && isNumber(Number(height)) ? Number(height) : undefined;

        await sharp(file.path)
          .resize(realWidth, realHeight)
          .toFile(webImagePathName);

        fs.unlinkSync(file.path);

        return get200Response({
          res,
          json: {
            imageSrc: webImagePathName.replace(getAssetsDir(), ""),
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
