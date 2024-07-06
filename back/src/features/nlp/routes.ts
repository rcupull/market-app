import { Router } from 'express';

import { hasAccess, isAdmin, isLogged } from '../../middlewares/verify';
import { nlpHandles } from './handles';

export const router = Router();

router.route('/nlp/train').post(isLogged, isAdmin, hasAccess('full'), nlpHandles.post_nlp_train());

router.route('/nlp/search').get(isLogged, isAdmin, hasAccess('full'), nlpHandles.get_nlp_search());
