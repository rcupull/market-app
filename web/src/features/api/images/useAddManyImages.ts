import { useFetch } from 'hooks/useFetch';

import { FetchResource } from 'types/api';
import { Image, ImageFile } from 'types/general';
import { getEndpoint } from 'utils/api';

export const useAddManyImages = (): {
  addManyImages: FetchResource<
    {
      images: Array<ImageFile | Image>;
      userId: string;
      routeName?: string;
      postId?: string;
      height?: number;
      width?: number;
    },
    Array<Image>
  >;
} => {
  const fetch = useFetch();

  return {
    addManyImages: {
      data: fetch[0],
      status: fetch[1],
      fetch: ({ images, userId, postId, routeName, width, height }, options = {}) => {
        const promises = images.map((image) => {
          return new Promise<Image>((resolve) => {
            if (image.src instanceof File) {
              const form = new FormData();
              form.append('upload', image.src);

              fetch[2](
                {
                  method: 'post',
                  url: getEndpoint({
                    path: '/images',
                    query: { userId, routeName, postId, width, height },
                  }),
                  data: form,
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                },
                {
                  onAfterSuccess: (response) => {
                    resolve({
                      ...image,
                      src: response.imageSrc,
                    });
                  },
                },
              );
            } else {
              resolve(image as Image);
            }
          });
        });

        Promise.all(promises).then((images) => {
          const { onAfterSuccess } = options || {};

          onAfterSuccess?.(images);
        });
      },
      reset: fetch[3],
    },
  };
};
