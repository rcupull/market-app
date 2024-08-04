import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const TermsAndConditions = dynamic(() =>
  import('pages/@common/terms-and-conditions').then((m) => m)
);

export const useTermsAndConditionsModal = () => {
  const { pushModal } = useModal();

  return {
    termsAndConditionsModal: {
      open: () => {
        pushModal('Emergent', {
          useProps: () => {
            const portal = usePortal();

            return {
              title: 'Términos y Condiciones',
              content: (
                <TermsAndConditions portal={portal} className="max-h-[75vh] overflow-y-auto" />
              ),
              secondaryBtn: <ButtonClose />,
              primaryBtn: <div ref={portal.ref} />,
              className: '!w-[95vw] !sm:w-[80vw]'
            };
          }
        });
      }
    }
  };
};
