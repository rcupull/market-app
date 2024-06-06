import { Router } from 'express';
import { isLogged } from '../../middlewares/verify';
import { imageHandles } from './handles';
import { validators } from '../../middlewares/express-validator';

export const router = Router();

/////////////////////////////////////////////////////////////////

router.route('/images').post(isLogged, imageHandles.save_image());

router
  .route('/images-checkeditor')
  .post(
    validators.query('endpoint').notEmpty(),
    validators.handle,
    isLogged,
    imageHandles.save_image_checkeditor(),
  );

/////////////////////////////////////////////////////////////////
