import { useEffect } from 'react';

import { PostsSectionCards } from 'components/posts-sections-view/components/posts-section-cards';

import { useGetRelatedPosts } from 'features/api/posts/useGetRelatedPosts';

import { LayoutSection } from 'pages/@common/layout-section';
import { Business } from 'types/business';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface PostsSectionProps extends StyleProps {
  postId: string;
  business: Business;
}

export const RelatedSection = ({ postId, className, business }: PostsSectionProps) => {
  const { getRelatedPosts } = useGetRelatedPosts();

  useEffect(() => {
    getRelatedPosts.fetch({ id: postId });
  }, []);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className={cn('mt-10 p-0 lg:p-4', className)}>
      <LayoutSection title='Productos relacionados'>
        <PostsSectionCards
          layout={{
            type: 'grid',
            postCardLayout: {
              images: 'static',
              size: 'medium',
            },
            name: 'Productos similares',
            postType: 'product',
            _id: 'dummyId',

          }}
          posts={getRelatedPosts.data}
          business={business}
          onRefresh={() => {}}
        />
      </LayoutSection>
    </div>
  );
};
