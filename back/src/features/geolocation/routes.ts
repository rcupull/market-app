import { Router } from 'express';
import { geolocationHandles } from './handles';
import { isLogged } from '../../middlewares/verify';

export const router = Router();

router.route('/geolocation/reverse').get(isLogged, geolocationHandles.get_geolocation_reverse());
