import { useSimpleSlice } from 'features/slices/useSimpleSlice';

import { onCloseBackdrop } from './closeContext/CloseContextProvider';
import { ModalId, ModalWindowOptions, ModalWindowProps } from './types';

interface ModalData<Id extends ModalId = ModalId> {
  id: Id;
  props: ModalWindowProps<Id>;
}

type OnCloseFn = () => void;
type PushModal = <Id extends ModalId>(
  id: Id,
  props: ModalWindowProps<Id>,
  options?: ModalWindowOptions
) => void;

type OnIsOpen = <Id extends ModalId>(id: Id) => boolean;

export const useModal = (): {
  pushModal: PushModal;
  onClose: OnCloseFn;
  _onClose: OnCloseFn;
  onCloseAll: OnCloseFn;
  onIsOpen: OnIsOpen;
  allModalData: Array<ModalData>;
} => {
  const { data, setData, reset } = useSimpleSlice<Array<ModalData>>('emergentModals');

  ///////////////////////////////////////////////////////////////////////////////////////////
  const _onClose = () => setData((currentState) => currentState.slice(0, -1));

  const onCloseAll = () => {
    reset();
  };

  const pushModal: PushModal = (modalId, props, options) => {
    const { timeout } = options || {};

    const handlePush = () => {
      setData((state) => [...state, { id: modalId, props }]);
    };

    if (timeout) {
      setTimeout(handlePush, timeout);
      return;
    }
    handlePush();
  };

  const onIsOpen: OnIsOpen = (currentId) => {
    return data.some(({ id }) => currentId === id);
  };

  return {
    pushModal,
    _onClose,
    onClose: onCloseBackdrop,
    onCloseAll,
    onIsOpen,
    allModalData: data,
  };
};
