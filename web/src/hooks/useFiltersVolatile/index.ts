import { useState } from 'react';

import { AnyRecord } from 'types/general';
import { isEqualObj } from 'utils/general';

export interface UseFiltersArgs<S> {
  onChange?: (state: S) => void;
}

export interface UseFiltersReturn<S extends AnyRecord = AnyRecord> {
  onMergeFilters: (partialFilter: S, options?: { forceFetch?: boolean }) => void;
  onRefresh: () => void;
  value: S;
}

export const useFiltersVolatile = <S extends AnyRecord = AnyRecord>(
  args: UseFiltersArgs<S>,
): UseFiltersReturn<S> => {
  const { onChange } = args || {};

  const [filterValue, setFilter] = useState<S>({} as S);

  return {
    onMergeFilters: (partialValue: S, options) => {
      const { forceFetch } = options || {};

      const newFilterValue: S = {
        ...filterValue,
        ...partialValue,
      };

      const hasChanges = !isEqualObj(newFilterValue, filterValue);

      setFilter(newFilterValue);

      if (hasChanges || forceFetch) {
        onChange?.(newFilterValue);
      }
    },
    onRefresh: () => onChange?.(filterValue),
    value: filterValue,
  };
};
