import { useEffect } from 'react';

import { Button } from 'components/button';
import { StepperButtonContainer } from 'components/stepper/StepperButtonContainer';

import { useGetAllPosts } from 'features/api/posts/useGetAllPosts';

import { OnboardingStepProps } from '../../types';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useNextButtonPortal } from 'pages/@hooks/useNextButtonPortal';
import { ComponentProduct } from 'pages/@modals/useBusinessNewUpdatePostModal/ComponentProduct';

export interface StepPostProps extends OnboardingStepProps {}

export const StepPost = ({ backButton, nextBtnProps, centerBtnProps }: StepPostProps) => {
  const { nextAction, portal, rightButton } = useNextButtonPortal({ nextBtnProps });
  const { business } = useBusiness();

  const { getAllPosts } = useGetAllPosts();

  useEffect(() => {
    if (business) {
      /**
       * Fetch the fisrt product of the business
       */
      getAllPosts.fetch({ routeNames: [business.routeName], limit: 1 });
    }
  }, []);

  return (
    <div>
      <ComponentProduct
        portal={portal}
        post={getAllPosts.data?.[0]}
        onAfterSuccess={() => {
          nextAction();
        }}
        className="max-h-[70vh] overflow-y-auto"
      />
      <StepperButtonContainer
        leftButton={backButton}
        rightButton={rightButton}
        centerButton={<Button {...centerBtnProps} />}
      />
    </div>
  );
};
