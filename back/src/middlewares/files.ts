import multer from "multer";
import fs from "fs";
import { getDirPathNameToUpload } from "../features/images/utils";

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dirPathName = getDirPathNameToUpload({ req });

    if (!dirPathName) {
      return cb(new Error("has not dirPathName"), "");
    }

    fs.mkdirSync(dirPathName, { recursive: true });

    cb(null, dirPathName);
  },
});

export const uploadImageMiddleware = multer({
  storage: imageStorage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  // fileFilter: (req, file, done) => {
  //   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
  //     done(null, true);
  //   } else {
  //     done(null, false);
  //   }
  // },
}).single("image");
