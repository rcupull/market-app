import multer from "multer";
import fs from "fs";
import { getAssetsImageDir } from "../config";

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { routeName, postId, userId } = req.query;

    if (postId && !routeName) {
      return cb(new Error("routeName is required to upload a postimage"), "");
    }

    let path = `${getAssetsImageDir()}/${userId}/`;

    if (routeName) {
      path = `${path}${routeName}/`;
    }

    if (postId) {
      path = `${path}${postId}/`;
    }

    fs.mkdirSync(path, { recursive: true });

    cb(null, path); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename the file to include the timestamp
  },
});

export const uploadImageMiddleware = multer({
  storage: imageStorage,
});
