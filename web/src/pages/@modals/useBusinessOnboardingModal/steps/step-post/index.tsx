import { useEffect } from 'react';

import { StepperButtonContainer } from 'components/stepper/StepperButtonContainer';

import { useGetAllPosts } from 'features/api/posts/useGetAllPosts';

import { OnboardingStepProps } from '../../types';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useNextButtonPortal } from 'pages/@hooks/useNextButtonPortal';
import { Component } from 'pages/@modals/useBusinessNewUpdatePost/Component';

export interface StepPostProps extends OnboardingStepProps {}

export const StepPost = ({ backButton, nextButton }: StepPostProps) => {
  const { nextAction, portal, rightButton } = useNextButtonPortal(nextButton);
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
      <Component
        portal={portal}
        post={getAllPosts.data?.[0]}
        postType="product"
        onAfterSuccess={() => {
          nextAction();
        }}
        className="max-h-[70vh] overflow-y-auto"
      />
      <StepperButtonContainer leftButton={backButton} rightButton={rightButton} />
    </div>
  );
};
