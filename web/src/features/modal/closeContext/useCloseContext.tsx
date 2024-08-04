import { useContext } from 'react';

import { useDebouncer } from 'hooks/useDebouncer';

import { CloseContext } from './CloseContext';

export const useCloseContext = (): {
  onChangeUnsavedChanges: (value: boolean) => void;
} => {
  const { onChangeUnsavedChanges } = useContext(CloseContext);
  const debouncer = useDebouncer();

  return {
    onChangeUnsavedChanges: (hasChange) => {
      debouncer(() => onChangeUnsavedChanges(hasChange), 100);
    }
  };
};
