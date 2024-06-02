import { useState } from 'react';

import { Button } from 'components/button';
import { ReviewAverage } from 'components/review-average';

import { useMakeReviewPost } from 'features/api/posts/useMakeReviewPost';

import { Portal } from 'hooks/usePortal';

import { isNumber } from 'utils/general';

export interface ComponentProps {
  portal: Portal;
  postId: string;
  onAfterSuccess?: () => void;
}

export const Component = ({ portal, postId, onAfterSuccess }: ComponentProps) => {
  const [state, setState] = useState<number>();

  const { makeReviewPost } = useMakeReviewPost();

  return (
    <div className="flex min-h-full flex-col justify-center">
      <ReviewAverage value={state} onChange={setState} />

      {portal.getPortal(
        <Button
          label="Votar"
          isBusy={makeReviewPost.status.isBusy}
          disabled={!isNumber(state)}
          onClick={() => {
            if (!isNumber(state)) return;

            makeReviewPost.fetch(
              {
                postId,
                value: state,
              },
              {
                onAfterSuccess,
              },
            );
          }}
          className="w-full"
        />,
      )}
    </div>
  );
};

export default Component;
