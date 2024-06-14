import { IconButtonView } from 'components/icon-button-view';

import { useRouter } from 'hooks/useRouter';

import SvgMehRollingEyes from 'icons/MehRollingEyes';
import { StyleProps } from 'types/general';
import { Post } from 'types/post';
import { ShoppingPostData } from 'types/shopping';
import { getOnePostRoute } from 'utils/business';
import { cn } from 'utils/general';

export interface IconButtonViewPostPageProps extends StyleProps {
  post: Post | ShoppingPostData;
}
export const IconButtonViewPostPage = ({ post, className }: IconButtonViewPostPageProps) => {
  const { pushRoute, isThisPostPage } = useRouter();
  const { _id: postId, routeName } = post;

  if (isThisPostPage({ postId, routeName })) {
    return <SvgMehRollingEyes className={cn('size-6 fill-indigo-600 mx-2', className)} />;
  }

  return (
    <IconButtonView
      title="Ver la página de la publicación"
      onClick={() => pushRoute(getOnePostRoute({ postId, routeName }))}
      className={className}
    />
  );
};
