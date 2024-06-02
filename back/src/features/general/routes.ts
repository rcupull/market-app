import { Router } from 'express';
import { generalHandles } from './handles';

export const router = Router();

router.route('/general/business-categories').get(generalHandles.get_business_categories());
