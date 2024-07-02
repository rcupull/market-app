import { useEffect } from 'react';

import { useGetAllPosts } from 'features/api/posts/useGetAllPosts';

import { useInterval } from 'hooks/useInterval';

import { useBusinessOnboardingModal } from 'pages/@modals/useBusinessOnboardingModal';
import { BusinessOnboardingSteps } from 'pages/@modals/useBusinessOnboardingModal/types';
import { Business } from 'types/business';
import { isEmpty } from 'utils/general';

export interface BusinessConfigProps {
  business: Business;
}

export const BusinessConfig = ({ business }: BusinessConfigProps) => {
  const businessOnboardingModal = useBusinessOnboardingModal();
  const { getAllPosts } = useGetAllPosts();

  const hasPosts = async (b: Business): Promise<boolean> => {
    return new Promise((resolve) => {
      getAllPosts.fetch(
        { routeNames: [b.routeName] },
        {
          onAfterSuccess: ({ data }) => {
            resolve(!!data.length);
          },
        }
      );
    });
  };
  const interval = useInterval();
  const handleIsMissing = async (b: Business): Promise<Array<BusinessOnboardingSteps>> => {
    const out: Array<BusinessOnboardingSteps> = [];

    if (!isEmpty(b?.notificationFlags) && !b?.telegramBotChat) {
      out.push('notifications');
    }
    if (isEmpty(b?.bannerImages)) {
      out.push('banner');
    }
    if (!b?.layouts?.posts?.sections.length) {
      out.push('section');
    }
    if (!(await hasPosts(b))) {
      out.push('products');
    }

    return out;
  };

  const handleCheck = async (b: Business) => {
    const steps = await handleIsMissing(b);

    if (steps.length) {
      businessOnboardingModal.open({ steps });
    }
  };

  useEffect(() => {
    interval.cancel();

    handleCheck(business);
    interval(() => handleCheck(business), 5 * 60 * 1000);

    return () => {
      interval.cancel();
    };
  }, [business.routeName]);

  return <></>;
};
