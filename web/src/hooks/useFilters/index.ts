import { useEffect, useRef } from 'react';

import { useRouter } from 'hooks/useRouter';

import { AnyRecord } from 'types/general';
import { getFlattenJson, isEmpty, isString } from 'utils/general';

export interface UseFiltersArgs<S> {
  filterField?: string;
  onChange?: (state: S) => void;
  notCallChangeWhenMount?: boolean;
}

export interface UseFiltersReturn<S extends AnyRecord = AnyRecord> {
  onMergeFilters: (partialFilter: S) => void;
  onRefresh: () => void;
  value: S;
}

export const useFilters = <S extends AnyRecord = AnyRecord>(
  args: UseFiltersArgs<S>
): UseFiltersReturn<S> => {
  const { onChange, notCallChangeWhenMount, filterField = 'filters' } = args || {};

  const refMounted = useRef<boolean>(false);

  const { query = {}, onChangeQuery } = useRouter();

  const filterValue = isString(query[filterField]) ? JSON.parse(query[filterField]) : {};

  const handleChangeFilterState = (filtersValue: S) => {
    const filters = isEmpty(getFlattenJson(filtersValue))
      ? undefined
      : JSON.stringify(filtersValue);

    onChangeQuery({
      [filterField]: filters
    });
  };

  const onMergeFilters = (partialValue: S) => {
    const newValue = { ...(filterValue || {}), ...partialValue };
    handleChangeFilterState(newValue);
  };

  useEffect(() => {
    if (notCallChangeWhenMount && !refMounted.current) {
      refMounted.current = true;
      return;
    }
    refMounted.current = true;
    onChange?.(filterValue);
  }, [JSON.stringify(filterValue)]);

  return {
    onMergeFilters,
    onRefresh: () => onChange?.(filterValue),
    value: filterValue
  };
};
