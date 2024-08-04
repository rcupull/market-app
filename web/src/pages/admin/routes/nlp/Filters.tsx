import { FieldInput } from 'components/field-input';
import { Formux } from 'components/formux';

import { useDebouncer } from 'hooks/useDebouncer';

import { FilterQuery } from './types';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface FiltersProps extends StyleProps {
  onChange?: (filters: FilterQuery) => void;
  value?: FilterQuery;
}

export const Filters = ({ onChange, value, className }: FiltersProps) => {
  const debouncer = useDebouncer();

  return (
    <Formux<{ search: string }>
      value={{
        search: value?.search || ''
      }}
      onChange={(filters) => {
        const { search } = filters;

        debouncer(() => {
          onChange?.({ ...filters, search });
        }, 500);
      }}
    >
      {() => {
        return (
          <form className={cn('mt-10 w-full', className)}>
            <FieldInput preventDefaultEnter name="search" label="Buscar" />
          </form>
        );
      }}
    </Formux>
  );
};
