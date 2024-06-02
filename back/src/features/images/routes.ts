import { Router } from 'express';
import { isLogged } from '../../middlewares/verify';
import { imageHandles } from './handles';

export const router = Router();

/////////////////////////////////////////////////////////////////

router.route('/images').post(isLogged, imageHandles.save_image());

/////////////////////////////////////////////////////////////////
