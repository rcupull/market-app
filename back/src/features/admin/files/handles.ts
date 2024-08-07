import { middlewareUploadFile } from '../../../middlewares/middlewareUploadFile';
import { RequestHandler } from '../../../types/general';
import { withTryCatch } from '../../../utils/error';
import { get200Response, get400Response } from '../../../utils/server-response';

const post_admin_files_upload_apk: () => RequestHandler = () => {
  return (req, res) => {
    withTryCatch(req, res, async () => {
      middlewareUploadFile(req, res, async (err) => {
        if (err) {
          return get400Response({ res, json: { message: err.message } });
        }

        return get200Response({
          res
        });
      });
    });
  };
};

export const adminFilesHandles = {
  post_admin_files_upload_apk
};
