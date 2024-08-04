import { useRef } from 'react';

import { Button } from 'components/button';
import { ReviewAverage } from 'components/review-average';
import { SpinnerEllipsis } from 'components/spinner-ellipsis';

import { useScrollBottom } from 'hooks/useScrollBottom';

import { LayoutSection } from 'pages/@common/layout-section';
import { FetchStatus } from 'types/api';
import { StyleProps } from 'types/general';
import { ReviewDto } from 'types/reviews';
import { cn } from 'utils/general';

export interface PostsReviewsProps extends StyleProps {
  data: Array<ReviewDto> | null;
  onScrollBottom?: () => void;
  status: FetchStatus;
  onAddReview: VoidFunction;
}

export const PostsReviews = ({
  data,
  className,
  onScrollBottom,
  status,
  onAddReview
}: PostsReviewsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isBusy, wasCalled } = status;
  const { onScroll } = useScrollBottom(ref, () => onScrollBottom?.());

  return (
    <LayoutSection title="Reseñas de este producto" className={className}>
      {wasCalled && !data?.length && (
        <span className="text-gray-500 text-lg">
          No tenemos reseñas registradas hasta ahora pero tú puedes ser la primera. Coméntanos que
          crees y{' '}
          <Button
            variant="link"
            onClick={onAddReview}
            label="añade tu opinión"
            className="!inline !text-lg"
          />
        </span>
      )}
      <div ref={ref} onScroll={onScroll} className={cn('max-h-80 overflow-auto')}>
        {data?.map(({ comment, reviewerName, star }, index) => {
          const firstletter = reviewerName?.charAt(0);
          const lastletter = reviewerName?.charAt(reviewerName?.length - 1);
          return (
            <div key={index} className="flex flex-col gap-2 p-3 border-b-2 border-gray-300">
              <p>{`${firstletter}***${lastletter}`}</p>
              <ReviewAverage value={star} />
              <p>{comment}</p>
            </div>
          );
        })}

        {isBusy && (
          <div className="flex justify-center">
            <SpinnerEllipsis />
          </div>
        )}
      </div>
    </LayoutSection>
  );
};
