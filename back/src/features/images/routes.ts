import { Router } from 'express';
import { isLogged } from '../../middlewares/verify';
import { imageHandles } from './handles';
import { middlewareExpressValidator } from '../../middlewares/middlewareExpressValidator';

export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route('/images')
  .post(isLogged, imageHandles.post_images())
  .delete(
    middlewareExpressValidator.body('srcs'),
    middlewareExpressValidator.handle,
    isLogged,
    imageHandles.delete_images()
  );

router.route('/images-checkeditor').post(isLogged, imageHandles.post_image_checkeditor());
