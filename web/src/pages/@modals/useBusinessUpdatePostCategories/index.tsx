import { useState } from 'react';

import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePortal } from 'hooks/usePortal';

import { dynamic } from 'utils/makeLazy';

//eslint-disable-next-line
const Component = dynamic(() => import('./Component').then((m) => m));

export const useBusinessUpdatePostCategories = () => {
  const { pushModal } = useModal();

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const handleAttemptToClose = () => {
    console.log("hasUnsavedChanges", hasUnsavedChanges)
    if (!hasUnsavedChanges) 
      return;
    console.log("llegue hasta aqui")
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
                }}
              />
            ),
          };
        },
      },
      { emergent : true},
    );
  };

  return {
    open: (args?: { onAfterSuccess: () => void }) => {
      pushModal(
        'Emergent',
        {
          useProps: () => {
            const portal = usePortal();
            const { onClose } = useModal();

            return {
              title: 'Categorías',
              content: (
                <Component
                  portal={portal}
                  setHasUnsavedChanges={setHasUnsavedChanges}
                  onAfterSuccess={() => {
                    args?.onAfterSuccess?.();
                    onClose();
                  }}
                />
              ),
              secondaryBtn: 
                <ButtonClose 
                  onClick={() => {
                    handleAttemptToClose();
                    onClose();
                  }}
                />,
              primaryBtn: <div ref={portal.ref} />,
            };
          },
        },
        { emergent: true },
      );
    },
  };
};
