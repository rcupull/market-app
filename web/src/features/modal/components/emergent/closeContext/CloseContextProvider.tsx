import { cloneElement, useState } from 'react';

import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { ModalProps } from 'components/modal';

import { useModal } from 'features/modal/useModal';

import { CloseContext } from './CloseContext';

export interface CloseContextProviderProps {
  modalProps: Partial<ModalProps>;
  children: (args: { modalProps: Partial<ModalProps> }) => React.ReactNode;
}

export const CloseContextProvider = ({ modalProps, children }: CloseContextProviderProps) => {
  const { secondaryBtn: secondaryBtnProp } = modalProps;

  const { pushModal, onClose } = useModal();

  const [hasUnsavedChanges, serHasUnsavedChanges] = useState(false);

  let secondaryBtn = secondaryBtnProp;

  if (hasUnsavedChanges && secondaryBtn) {
    secondaryBtn = cloneElement(secondaryBtn, {
      onClick: () => {
        pushModal(
          'Confirmation',
          {
            useProps: () => {
              const { onClose: onCloseThis } = useModal();

              return {
                title: 'Descartar cambios',
                content: '¿Estás seguro que deseas cerrar sin guardar los cambios?',
                primaryBtn: (
                  <Button
                    label="Descartar"
                    variant="error"
                    onClick={() => {
                      onCloseThis();
                      onClose();
                    }}
                  />
                ),
                secondaryBtn: <ButtonClose label="Cancelar" />,
                className: '!w-96',
              };
            },
          },
          { emergent: true },
        );
      },
    });
  }

  return (
    <CloseContext.Provider value={{ onChangeUnsavedChanges: serHasUnsavedChanges }}>
      {children({ modalProps: { ...modalProps, secondaryBtn } })}
    </CloseContext.Provider>
  );
};
