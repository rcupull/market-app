import { useMemo } from 'react';

import { Button } from 'components/button';
import { ReviewAverage } from 'components/review-average';

import { StyleProps } from 'types/general';
import { PostReviews } from 'types/post';

export interface ReviewProps extends StyleProps {
  value?: PostReviews;
  onClickToSubmit?: () => void;
}

export const Review = ({ value, className, onClickToSubmit }: ReviewProps) => {
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
          <ReviewAverage value={average} />
        </div>
        <span className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
          {`${totalCount} ${totalCount === 1 ? 'voto' : 'votos'}`}
        </span>
        <Button label="Votar" className="ml-2 !py-0" onClick={() => onClickToSubmit?.()} />
      </div>
    </div>
  );
};
