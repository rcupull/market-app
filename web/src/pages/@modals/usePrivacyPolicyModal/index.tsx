import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const PrivacyPolicy = dynamic(() => import('pages/@common/privacy-policy').then((m) => m));

export const usePrivacyPolicyModal = () => {
  const { pushModal } = useModal();

  return {
    privacyPolicyModal: {
      open: () => {
        pushModal(
          'Emergent',
          {
            useProps: () => {
              return {
                title: 'Políticas de privacidad',
                content: <PrivacyPolicy />,
                customBtn: <ButtonClose className="ml-auto" />,
                className: '!w-[95vw] !sm:w-[80vw]',
              };
            },
          },
          { emergent: true },
        );
      },
    },
  };
};
