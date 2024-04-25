import { useGetOnePost } from 'features/api/posts/useGetOnePost';
import { useApiPersistent } from 'features/slices/useApiPersistent';

export const usePostIdPersistent = () => {
  const { getOnePost } = useGetOnePost();
  return useApiPersistent('usePostIdPersistent', getOnePost);
};
