import { useState } from 'react';

import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useBusinessUpdatePostCategoriesModal = () => {
  const { pushModal } = useModal();

  return {
    open: (args?: { onAfterSuccess: () => void }) => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const portal = usePortal();
            const { onClose: onCloseParent } = useModal();

            const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
            const handleAttemptToClose = () => {
              console.log('hasUnsavedChanges', hasUnsavedChanges);
              if (!hasUnsavedChanges){
                onCloseParent();
                return;
              }
              pushModal(
                'Confirmation',
                {
                  useProps: () => {
                    const { onClose } = useModal();
                    return {
                      title: 'Descartar cambios',
                      content: '¿Estás seguro de que deseas cerrar sin guardar los cambios?',
                      primaryBtn: (
                        <Button
                          label="Confirmar"
                          variant="primary"
                          onClick={() => {
                            onClose();
                            onCloseParent();
                          }}
                        />
                      ),
                    };
                  },
                },
                { emergent: true },
              );
            };

            return {
              title: 'Categorías',
              content: (
                <Component
                  portal={portal}
                  setHasUnsavedChanges={setHasUnsavedChanges}
                  onAfterSuccess={() => {
                    args?.onAfterSuccess?.();
                    onCloseParent();
                  }}
                />
              ),
              secondaryBtn: <ButtonClose onClick={handleAttemptToClose} />,
              primaryBtn: <div ref={portal.ref} />,
            };
          },
        },
        { emergent: true }
      );
    },
  };
};
