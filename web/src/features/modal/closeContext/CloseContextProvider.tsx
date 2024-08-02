import { useRef } from 'react';

import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';

import { useModal } from 'features/modal/useModal';

import { CloseContext } from './CloseContext';

export let onCloseCheckingChangeBackDrop = () => {};

export interface CloseContextProviderProps {
  children: React.ReactNode;
  last: boolean;
}

export const CloseContextProvider = ({ children, last }: CloseContextProviderProps) => {
  const modal = useModal();

  const refHasUnsavedChanges = useRef(false);

  if (last) {
    onCloseCheckingChangeBackDrop = () => {
      if (!refHasUnsavedChanges.current) {
        return modal.onClose();
      }

      modal.pushModal('Confirmation', {
        useProps: () => {
          const { onClose } = useModal();

          return {
            title: 'Descartar cambios',
            content: '¿Estás seguro que deseas cerrar sin guardar los cambios?',
            primaryBtn: (
              <Button
                label="Descartar"
                variant="error"
                onClick={() => {
                  onClose();
                  modal.onClose();
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
    <CloseContext.Provider
      value={{
        onChangeUnsavedChanges: (hasChange) => {
          refHasUnsavedChanges.current = hasChange;
        },
      }}
    >
      {children}
    </CloseContext.Provider>
  );
};
