import { RequestHandler } from "../../types/general";
import { uploadImageMiddleware } from "../../middlewares/files";
import { combineMiddleware } from "../../utils/general";
import { withTryCatch } from "../../utils/error";
import { imagesServices } from "./services";
import { ServerResponse } from "http";
import { get200Response } from "../../utils/server-response";
import { getAssetsDir } from "../../config";

const save_image: () => RequestHandler = () => {
  return combineMiddleware(
    uploadImageMiddleware.single("image"),
    (req, res) => {
      const { file } = req;
      if (!file) {
        return res.sendStatus(404).json({ message: "Has not file" });
      }

      res.send({
        imageSrc: file.path.replace(getAssetsDir(), ""),
      });
    }
  );
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
