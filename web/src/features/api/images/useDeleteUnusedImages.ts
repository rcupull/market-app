import { useFetch } from "hooks/useFetch";

import { FetchResource } from "types/api";
import { getEndpoint } from "utils/api";

export interface UseDeleteUnusedImagesResponse {
  message: string
}

export const useDeleteUnusedImages = (): {
  deleteUnusedImages: FetchResource<{ urls: Array<string> }, UseDeleteUnusedImagesResponse>;
} => {
  const fetch = useFetch();

  return {
    deleteUnusedImages:{
      data: fetch[0],
      status: fetch[1],
      fetch: ({ urls }, options = {}) => {
        fetch[2](
          {
            method: 'delete',
            url: getEndpoint({
              path: '/images-checkeditor/delete-unused',
              query: { urls },
            }),
          },
          options,
        );
      },
      reset: fetch[3],
    }
  }
}