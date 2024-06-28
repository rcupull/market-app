import multer from 'multer';

export const uploadImageMiddleware = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).single('upload');
