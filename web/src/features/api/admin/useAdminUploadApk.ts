import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { getEndpoint } from 'utils/api';
import { renameFile } from 'utils/file';

export const useAdminUploadApk = (): {
  adminUploadApk: FetchResource<{
    file: File;
  }>;
} => {
  const fetch = useFetch();

  return {
    adminUploadApk: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ file }, options = {}) => {
        const form = new FormData();
        form.append('upload', renameFile(file, 'asere-market.apk'));

        fetch[2](
          {
            method: 'post',
            url: getEndpoint({
              path: '/admin/files/upload-apk'
            }),
            data: form,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          },
          options
        );
      },
      reset: fetch[3]
    }
  };
};
