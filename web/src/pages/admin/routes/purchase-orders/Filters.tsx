import { FieldCheckbox } from 'components/field-checkbox';
import { FieldDateTimePickerCollapsable } from 'components/field-date-time-picker-collapsable';
import { FieldRadioGroup } from 'components/field-radio-group';
import { FieldSelectAsync } from 'components/field-select-async';
import { FiltersReset } from 'components/filters-reset';
import { Formux } from 'components/formux';

import { useGetAllBusinessSummary } from 'features/api/business/useGetAllBusinessSummary';

import { GetAllShoppingAdminQuery } from 'types/api';
import { StyleProps } from 'types/general';
import { ShoppingState } from 'types/shopping';
import { cn } from 'utils/general';
import { getShoppingStateLabel } from 'utils/shopping';

export interface FiltersProps extends StyleProps {
  onChange?: (filters: GetAllShoppingAdminQuery) => void;
  value?: GetAllShoppingAdminQuery;
}

const allStates: Array<ShoppingState> = [
  'CONSTRUCTION',
  'REQUESTED',
  'CANCELED',
  'REJECTED',
  'DELIVERED',
  'PROCESSING',
  'READY_TO_DELIVER',
];

export const Filters = ({ onChange, value, className }: FiltersProps) => {
  const useCall = () => useGetAllBusinessSummary().getAllBusinessSummary;

  return (
    <FiltersReset
      onClick={() => {
        onChange?.({
          page: 1,
          dateFrom: undefined,
          dateTo: undefined,
          states: [],
          routeNames: [],
        });
      }}
    >
      <Formux<GetAllShoppingAdminQuery>
        value={{
          states: value?.states || [],
          routeNames: value?.routeNames || [],
          dateFrom: value?.dateFrom,
          dateTo: value?.dateTo,
        }}
        onChange={(filters) => {
          onChange?.({
            ...filters,
            page: 1,
          });
        }}
      >
        {({ value }) => {
          return (
            <form className={cn('w-full', className)}>
              <FieldRadioGroup<{ value: ShoppingState }>
                name="states"
                label="Estados"
                renderOption={({ checked, item }) => (
                  <FieldCheckbox
                    noUseFormik
                    value={checked}
                    label={getShoppingStateLabel(item.value)}
                  />
                )}
                multi
                optionToValue={({ value }) => value}
                items={allStates.map((state) => ({ value: state }))}
                containerClassName="w-full flex item-center flex-wrap gap-4"
              />

              <FieldSelectAsync
                className="mt-2"
                name="routeNames"
                multi
                label="Negocios"
                useCall={useCall}
                searchToArgs={(search) => ({ search })}
                renderOption={({ name }) => name}
                optionToValue={({ routeName }) => routeName}
              />

              <div className="flex gap-4 mt-2 flex-wrap">
                <FieldDateTimePickerCollapsable
                  name="dateFrom"
                  label="Desde"
                  defaulthours="start"
                />
                <FieldDateTimePickerCollapsable
                  name="dateTo"
                  label="Hasta"
                  defaulthours="end"
                  minDate={value.dateFrom}
                />
              </div>
            </form>
          );
        }}
      </Formux>
    </FiltersReset>
  );
};
