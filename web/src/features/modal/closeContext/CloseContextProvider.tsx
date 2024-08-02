import { useState } from 'react';

import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { usePersistentValue } from 'hooks/usePersistentValue';

import { CloseContext } from './CloseContext';

export let onCloseBackdrop = () => {};

export interface CloseContextProviderProps {
  children: React.ReactNode;
  last: boolean;
}

export const CloseContextProvider = ({ children, last }: CloseContextProviderProps) => {
  const modal = useModal();

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const refHasUnsavedChanges = usePersistentValue(hasUnsavedChanges);

  if (last) {
    onCloseBackdrop = () => {
      if (!refHasUnsavedChanges.current) {
        return modal._onClose();
      }

      modal.pushModal('Confirmation', {
        useProps: () => {
          const { _onClose } = useModal();

          return {
            title: 'Descartar cambios',
            content: '¿Estás seguro que deseas cerrar sin guardar los cambios?',
            primaryBtn: (
              <Button
                label="Descartar"
                variant="error"
                onClick={() => {
                  _onClose();
                  modal._onClose();
                }}
              />
            ),
            secondaryBtn: <ButtonClose label="Cancelar" />,
            className: '!w-96',
          };
        },
      });
    };
  }

  return (
    <CloseContext.Provider value={{ onChangeUnsavedChanges: setHasUnsavedChanges }}>
      {children}
    </CloseContext.Provider>
  );
};
