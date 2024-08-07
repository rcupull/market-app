import multer from 'multer';
import { appUploadedFilesDir } from '../config';

export const middlewareUploadFile = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, appUploadedFilesDir);
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
  })
}).single('upload');
