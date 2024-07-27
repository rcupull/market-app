import { useGetOneBusiness } from 'features/api/business/useGetOneBusiness';
import { useAuth } from 'features/api-slices/useAuth';
import { useApiPersistent } from 'features/slices/useApiPersistent';

import { FetchOptions } from 'hooks/useFetch';

import { FetchStatus } from 'types/api';
import { Business, PostsLayoutSection } from 'types/business';
import { PostType } from 'types/post';

export const useBusiness = (): {
  business: Business | null;
  status: FetchStatus;
  onFetch: (args: { routeName: string }, options?: FetchOptions) => void;
  onReset: () => void;
  owner: boolean;
  getSections: (args?: {
    ids?: Array<string>;
    tags?: Array<string>;
    postType?: PostType;
  }) => Array<PostsLayoutSection>;
} => {
  const { getOneBusiness } = useGetOneBusiness();
  const { user } = useAuth();

  const { data, status, reset, fetch } = useApiPersistent('useBusiness', getOneBusiness);

  return {
    owner: user?._id === data?.createdBy,
    onFetch: ({ routeName }, options) => fetch({ routeName }, options),
    onReset: reset,
    status,
    business: data,
    getSections: (args) => {
      const { ids, tags, postType } = args || {};
      let out = data?.layouts?.posts?.sections || [];

      if (tags) {
        out = out.filter(({ postCategoriesTags }) => {
          return postCategoriesTags?.map((tag) => tags.includes(tag)).some(Boolean);
        });
      }

      if (ids) {
        out = out.filter(({ _id }) => ids.includes(_id));
      }

      if (postType) {
        out = out.filter((section) => section.postType === postType);
      }

      return out;
    },
  };
};
