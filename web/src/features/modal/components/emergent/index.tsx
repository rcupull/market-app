import { Modal, ModalProps } from 'components/modal';

import { CloseContextProvider } from './closeContext/CloseContextProvider';

export interface EmergentProps {
  useProps: () => Partial<ModalProps>;
}

export const Emergent = ({ useProps }: EmergentProps) => {
  const modalProps = useProps();

  return (
    <CloseContextProvider modalProps={modalProps}>
      {({ modalProps }) => <Modal content="<Some message>" {...modalProps} />}
    </CloseContextProvider>
  );
};

export default Emergent;
