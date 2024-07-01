import { PostCardLayout } from 'types/business';
import { mergeDeep } from 'utils/general';

export const getChangedPostCardLayout = (
  layout?: PostCardLayout,
  partial?: Partial<PostCardLayout>
): PostCardLayout => {
  return mergeDeep(layout || {}, partial || {});
};
