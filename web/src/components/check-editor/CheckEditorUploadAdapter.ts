import { persistentBackdoor } from 'features/persistent';

import axios from 'axios';

export class CheckEditorUploadAdapter {
  uploadUrl: string;
  loader: any;

  constructor(args: { loader: any; uploadUrl: string }) {
    const { loader, uploadUrl } = args;
    this.loader = loader;
    this.uploadUrl = uploadUrl;
  }

  async upload() {
    const file = await this.loader.file;

    const data = new FormData();
    data.append('upload', file);

    const accessToken = await persistentBackdoor.getPersistent('accessToken');

    return new Promise((resolve, reject) => {
      axios({
        url: this.uploadUrl,
        method: 'post',
        data,
        headers: {
          Authorization: accessToken && `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          const resData = res.data;
          resData.default = resData.url;
          resolve(resData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  abort() {
    // Reject promise returned from upload() method.
  }
}
