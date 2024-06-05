import multer from 'multer';
import fs from 'fs';
import { getAssetsImageDir } from '../config';

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(getAssetsImageDir(), { recursive: true });

    cb(null, getAssetsImageDir());
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
}).single('upload');
