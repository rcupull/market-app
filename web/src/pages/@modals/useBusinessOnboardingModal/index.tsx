import { useModal } from 'features/modal/useModal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() =>
  import('./Component').then((m) => ({
    default: m.Component,
  })),
);

export const useBusinessOnboardingModal = () => {
  const { pushModal } = useModal();

  return {
    open: () => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            return {
              content: <Component />,
              className: '!w-[80vw]',
            };
          },
        },
        { emergent: true },
      );
    },
  };
};
