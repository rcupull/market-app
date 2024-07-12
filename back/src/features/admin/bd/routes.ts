import { Router } from 'express';

import { bdHandles } from './handles';

export const router = Router();

router.get('/bd-script', bdHandles.get_admin_bd_script());
