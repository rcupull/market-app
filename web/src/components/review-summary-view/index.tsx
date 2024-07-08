import { useMemo } from 'react';

import { Button } from 'components/button';
import { ReviewAverage } from 'components/review-average';

import { useAuth } from 'features/api-slices/useAuth';

import { StyleProps } from 'types/general';
import { ReviewSummary } from 'types/reviews';

export interface ReviewSummaryViewProps extends StyleProps {
  reviewSummary?: ReviewSummary | null;
  onClickToSubmit?: () => void;
}

export const ReviewSummaryView = ({
  reviewSummary,
  className,
  onClickToSubmit,
}: ReviewSummaryViewProps) => {
  const { starSummary, reviewerIds } = reviewSummary || {};

  const { authData } = useAuth();

  const { average, totalCount } = useMemo(() => {
    let totalCount = 0;
    let totalSum = 0;

    starSummary?.forEach((count, index) => {
      totalCount = totalCount + count;
      totalSum = totalSum + (index + 1) * count;
    });

    return {
      totalCount,
      average: totalSum / totalCount,
    };
  }, [JSON.stringify(starSummary)]);

  const alreadyReviewed = authData?.user && reviewerIds?.includes(authData?.user._id);

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
        {!alreadyReviewed && (
          <Button
            label="Dar mi opinión"
            className="ml-2 !py-0"
            onClick={() => onClickToSubmit?.()}
          />
        )}
      </div>
    </div>
  );
};
