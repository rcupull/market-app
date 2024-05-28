import { useModal } from 'features/modal/useModal';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useBusinessOnboardingModal = () => {
  const { pushModal } = useModal();

  return {
    open: () => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const { status } = useBusiness();

            return {
              content: <Component />,
              className: '!w-[80vw]',
              isBusy: status.isBusy,
            };
          },
        },
        { emergent: true },
      );
    },
  };
};
