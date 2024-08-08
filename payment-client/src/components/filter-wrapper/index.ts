import { useFilters, UseFiltersArgs, UseFiltersReturn } from 'hooks/useFilters';

import { AnyRecord } from 'types/general';

interface FilterArgs<S extends AnyRecord = AnyRecord> {
  onChange?: (state: S) => void;
  notCallChangeWhenMount?: boolean;
}

export interface Filters<S extends AnyRecord = AnyRecord> {
  onMergeFilters: (partialFilter: S) => void;
  onRefresh: () => void;
  value: S;
  onUpdateArgs: (args: FilterArgs<S>) => void;
}

export interface FilterWrapperProps<S extends AnyRecord = AnyRecord> extends UseFiltersArgs<S> {
  children: (args: UseFiltersReturn<S>) => React.ReactNode;
}

export const FilterWrapper = <S extends AnyRecord = AnyRecord>({
  children,
  ...props
}: FilterWrapperProps<S>) => {
  const filter = useFilters<S>(props);

  return children(filter);
};
