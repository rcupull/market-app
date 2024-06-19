import { IconButtonView } from 'components/icon-button-view';

import { useRouter } from 'hooks/useRouter';

import SvgMehRollingEyes from 'icons/MehRollingEyes';
import { StyleProps } from 'types/general';
import { getOnePostRoute } from 'utils/business';
import { cn } from 'utils/general';

export interface IconButtonViewPostPageProps extends StyleProps {
  routeName: string;
  postId: string;
}
export const IconButtonViewPostPage = ({
  postId,
  className,
  routeName,
}: IconButtonViewPostPageProps) => {
  const { pushRoute, isThisPostPage } = useRouter();

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
