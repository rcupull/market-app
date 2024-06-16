
import { FieldInput } from 'components/field-input';
import { Formux } from 'components/formux';

import { GetAllBusinessQuery } from 'types/api';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';


export interface FiltersProps extends StyleProps {
  onChange?: (filters: GetAllBusinessQuery) => void;
  value?: GetAllBusinessQuery;
}

export const Filters = ({ onChange, value, className }: FiltersProps) => {
  return (
    <Formux<{ search: string }>
      value={{
        search: value?.search || '',
      }}
      onChange={(filters) => {
        const { search } = filters;

        onChange?.({ ...filters, page: 1, search });
      }}
    >
      {() => {
        return (
          <form className={cn('mt-10 w-full', className)}>
            <FieldInput name="search" label="Buscar" />
          </form>
        );
      }}
    </Formux>
  );
};
