import { useContext } from 'react';

import { CloseContext } from './CloseContext';

import { isEqual } from 'utils/general';

export const useCloseContext = <T extends any = any>({
  initialValue,
}: {
  initialValue: T;
}): {
  onChangeValue: (currentValue: T) => void;
} => {
  const { onChangeUnsavedChanges } = useContext(CloseContext);

  return {
    onChangeValue: (currentValue) => {
      const hasUnsavedChanges = !isEqual(initialValue, currentValue);
      onChangeUnsavedChanges(hasUnsavedChanges);
    },
  };
};
