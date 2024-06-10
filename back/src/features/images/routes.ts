import { Router } from 'express';
import { isLogged } from '../../middlewares/verify';
import { imageHandles } from './handles';
import { validators } from '../../middlewares/express-validator';

export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route('/images')
  .post(isLogged, imageHandles.post_images())
  .delete(validators.body('srcs'), validators.handle, isLogged, imageHandles.delete_images());

router
  .route('/images-checkeditor')
  .post(
    validators.query('endpoint').notEmpty(),
    validators.handle,
    isLogged,
    imageHandles.post_image_checkeditor()
  );
