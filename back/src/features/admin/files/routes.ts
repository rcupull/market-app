import { Router } from 'express';

import { adminFilesHandles } from './handles';
import { middlewareIsLogged } from '../../../middlewares/middlewareIsLogged';
import { middlewareIsAdmin } from '../../../middlewares/middlewareIsAdmin';
import { middlewareHasAccess } from '../../../middlewares/middlewareHasAccess';

export const router = Router();

router
  .route('/files/upload-apk')
  .post(
    middlewareIsLogged,
    middlewareIsAdmin,
    middlewareHasAccess('full'),
    adminFilesHandles.post_admin_files_upload_apk()
  );
