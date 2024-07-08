import { LayoutSection } from 'pages/@common/layout-section';
import { StyleProps } from 'types/general';
import { ReviewDto } from 'types/reviews';

export interface PostsReviewsProps extends StyleProps {
  data: Array<ReviewDto> | null;
}

export const PostsReviews = ({ data }: PostsReviewsProps) => {
  return (
    <LayoutSection title="Reseñas de este producto">
      {data?.map(({ comment, reviewerName }, index) => {
        return (
          <div key={index}>
            <p>{reviewerName}</p>
            <p>{comment}</p>
          </div>
        );
      })}
    </LayoutSection>
  );
};
