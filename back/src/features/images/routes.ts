import { Router } from 'express';
import { imageHandles } from './handles';
import { middlewareExpressValidator } from '../../middlewares/middlewareExpressValidator';
import { middlewareIsLogged } from '../../middlewares/middlewareIsLogged';

export const router = Router();

/////////////////////////////////////////////////////////////////

router
  .route('/images')
  .post(middlewareIsLogged, imageHandles.post_images())
  .delete(
    middlewareExpressValidator.body('srcs'),
    middlewareExpressValidator.handle,
    middlewareIsLogged,
    imageHandles.delete_images(),
  );

router.route('/images-checkeditor').post(middlewareIsLogged, imageHandles.post_image_checkeditor());
