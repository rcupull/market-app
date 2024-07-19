import { Router } from 'express';
import { geolocationHandles } from './handles';
import { middlewareIsLogged } from '../../middlewares/middlewareIsLogged';

export const router = Router();

router
  .route('/geolocation/reverse')
  .get(middlewareIsLogged, geolocationHandles.get_geolocation_reverse());
