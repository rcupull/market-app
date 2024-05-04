import { useMemo } from 'react';

import SvgStar from 'icons/Star';
import { StyleProps } from 'types/general';
import { PostReviews } from 'types/post';
import { cn } from 'utils/general';

export interface ReviewProps extends StyleProps {
  value?: PostReviews;
  onClickToReview?: () => void;
}

export const Review = ({ value, onClickToReview, className }: ReviewProps) => {
  const { average, totalCount } = useMemo(() => {
    let totalCount = 0;
    let totalSum = 0;

    value?.forEach((count, index) => {
      totalCount = totalCount + count;
      totalSum = totalSum + (index + 1) * count;
    });

    return {
      totalCount,
      average: totalSum / totalCount,
    };
  }, [JSON.stringify(value)]);

  if (!value) return <></>;

  return (
    <div className={className}>
      <h3 className="sr-only">Reviews</h3>
      <div className="flex items-center">
        <div className="flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
            <SvgStar
              key={rating}
              className={cn(
                average > rating ? 'fill-gray-900' : 'fill-gray-200',
                'h-5 w-5 flex-shrink-0',
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="sr-only">{average} out of 5 stars</p>
        <a
          onClick={onClickToReview}
          className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          {totalCount}
          {` ${totalCount === 1 ? 'voto' : 'votos'}`}
        </a>
      </div>
    </div>
  );
};
