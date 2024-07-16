import { useEffect } from 'react';

import { PostsSectionCards } from 'components/posts-sections-view/components/posts-section-cards';

import { useGetRelatedPosts } from 'features/api/posts/useGetRelatedPosts';

import { useHotUpdateTableData } from 'hooks/useHotUpdateTableData';

import { LayoutSection } from 'pages/@common/layout-section';
import { Business } from 'types/business';
import { StyleProps } from 'types/general';
import { Post } from 'types/post';

export interface RelatedSectionsViewProps extends StyleProps {
  post: Post;
  business: Business;
}

export const PostsRelatedView = ({ post, business }: RelatedSectionsViewProps) => {
  const { getRelatedPosts } = useGetRelatedPosts();

  const hotUpdateTableData = useHotUpdateTableData<
    Post,
    { postId: string; stockAmountAvailable: number }
  >({
    data: getRelatedPosts.data,
    updateKey: `updatePostAmount`,
    findCB: (rowData, { postId }) => rowData._id === postId,
    changeCB: (rowData, { stockAmountAvailable }) => ({ ...rowData, stockAmountAvailable }),
  });

  useEffect(() => {
    getRelatedPosts.fetch({ postId: post._id });
  }, []);

  return (
    <LayoutSection title="Productos relacionados">
      <PostsSectionCards
        layout={{
          type: 'grid',
          postCardLayout: {
            images: 'static',
            size: 'medium',
            metaLayout: 'basic',
            price: 'basic',
            name: 'basic',
            discount: 'savedMoney',
            shoppingMethod: 'shoppingCart',
          },
          name: 'Productos similares',
          postType: 'product',
          _id: 'dummyId',
        }}
        posts={hotUpdateTableData.data}
        business={business}
        onRefresh={() => {}}
      />
    </LayoutSection>
  );
};
