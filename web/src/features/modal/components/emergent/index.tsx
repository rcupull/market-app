import { Modal, ModalProps } from 'components/modal';

export interface EmergentProps {
  useProps: () => Partial<ModalProps>;
}

export const Emergent = ({ useProps }: EmergentProps) => {
  const props = useProps();

  return <Modal content="<Some message>" {...props} />;
};
