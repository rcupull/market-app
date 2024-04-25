import { useSimpleSlice } from 'features/slices/useSimpleSlice';

import { useRouter } from 'hooks/useRouter';

import { ModalId, ModalWindowOptions, ModalWindowProps } from './types';

interface ModalData<Id extends ModalId = ModalId> {
  id: Id;
  props: ModalWindowProps<Id>;
}

type OnCloseFn = () => void;
type PushModal = <Id extends ModalId>(
  id: Id,
  props: ModalWindowProps<Id>,
  options?: ModalWindowOptions,
) => void;

type OnIsOpen = <Id extends ModalId>(id: Id) => boolean;

export const useModal = (): {
  pushModal: PushModal;
  onClose: OnCloseFn;
  onCloseAll: OnCloseFn;
  onIsOpen: OnIsOpen;
  allModalData: Array<ModalData>;
} => {
  const { onChangeQuery, query, onBack } = useRouter();

  const { modalId, modalProps } = query as { modalId?: ModalId; modalProps?: string };

  const {
    data: emergentState,
    setData,
    reset,
  } = useSimpleSlice<Array<ModalData>>('emergentModals');

  ///////////////////////////////////////////////////////////////////////////////////////////
  const handleCloseAllEmergent = () => reset();
  const handleCloseLastEmergent = () => setData((currentState) => currentState.slice(0, -1));
  const handleCloseRouterModal = () => onBack();

  const hasSomeEmergent = !!emergentState.length;

  const onClose = hasSomeEmergent ? handleCloseLastEmergent : handleCloseRouterModal;

  const onCloseAll = () => {
    handleCloseAllEmergent();
    handleCloseRouterModal();
  };

  const pushModal: PushModal = (modalId, props, options) => {
    const { timeout, emergent } = options || {};

    const handleAddEmergent = () => {
      setData((state) => [...state, { id: modalId, props }]);
    };

    const handlePushModal = () => {
      onChangeQuery({ modalId, modalProps: JSON.stringify(props) });
    };

    const handlePush = emergent ? handleAddEmergent : handlePushModal;

    if (timeout) {
      setTimeout(handlePush, timeout);
      return;
    }
    handlePush();
  };

  const onIsOpen: OnIsOpen = (currentId) => {
    return emergentState.some(({ id }) => currentId === id) || modalId === currentId;
  };

  const routerModalata: ModalData | undefined = modalId
    ? { id: modalId, props: modalProps ? JSON.parse(modalProps) : {} }
    : undefined;

  return {
    pushModal,
    onClose,
    onCloseAll,
    onIsOpen,
    allModalData: [...(routerModalata ? [routerModalata] : []), ...emergentState],
  };
};
