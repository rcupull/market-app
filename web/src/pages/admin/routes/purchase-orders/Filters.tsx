import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup } from 'components/field-radio-group';
import { FieldSelectAsync } from 'components/field-select-async';
import { Formux } from 'components/formux';

import { useGetAllBusinessSummary } from 'features/api/business/useGetAllBusinessSummary';

import { GetAllShoppingAdminQuery } from 'types/api';
import { StyleProps } from 'types/general';
import { ShoppingState } from 'types/shopping';
import { cn } from 'utils/general';
import { getShoppingStateLabel } from 'utils/shopping';

type ShoppingStateFilter = ShoppingState | 'ALL';

export interface FiltersProps extends StyleProps {
  onChange?: (filters: GetAllShoppingAdminQuery) => void;
  value?: GetAllShoppingAdminQuery;
}

export const Filters = ({ onChange, value, className }: FiltersProps) => {
  const useCall = () => useGetAllBusinessSummary().getAllBusinessSummary;

  return (
    <Formux<{ state: ShoppingStateFilter; routeNames: Array<string> }>
      value={{
        state: value?.states?.length === 1 ? value.states[0] : 'ALL',
        routeNames: value?.routeNames || [],
      }}
      onChange={(filters) => {
        const { state } = filters;

        onChange?.({ ...filters, page: 1, states: state === 'ALL' ? [] : [state] });
      }}
    >
      {() => {
        return (
          <form className={cn('mt-10 w-full', className)}>
            <FieldRadioGroup<{ value: ShoppingStateFilter }>
              name="state"
              renderOption={({ checked, item }) => (
                <FieldCheckbox
                  noUseFormik
                  value={checked}
                  label={item.value === 'ALL' ? 'Todas' : getShoppingStateLabel(item.value)}
                />
              )}
              optionToValue={({ value }) => value}
              items={[
                {
                  value: 'ALL',
                },
                {
                  value: 'CONSTRUCTION',
                },
                {
                  value: 'REQUESTED',
                },
                {
                  value: 'CANCELED',
                },
                {
                  value: 'REJECTED',
                },
              ]}
              containerClassName="w-full flex item-center flex-wrap gap-4"
            />
            <FieldSelectAsync
              className="mt-6"
              name="routeNames"
              multi
              label="Negocios"
              useCall={useCall}
              searchToArgs={(search) => ({ search })}
              renderOption={({ name }) => name}
              optionToValue={({ routeName }) => routeName}
            />
          </form>
        );
      }}
    </Formux>
  );
};
