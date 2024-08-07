import { FieldCheckbox } from 'components/field-checkbox';
import { FieldDateTimePickerCollapsable } from 'components/field-date-time-picker-collapsable';
import { FieldRadioGroup } from 'components/field-radio-group';
import { FieldSelectAsync } from 'components/field-select-async';
import { FiltersContainer } from 'components/filters-container';
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
  ShoppingState.CONSTRUCTION,
  ShoppingState.REQUESTED,
  ShoppingState.APPROVED,
  ShoppingState.CANCELED,
  ShoppingState.REJECTED,
  ShoppingState.DELIVERED,
  ShoppingState.PROCESSING
];

export const Filters = ({ onChange, value, className }: FiltersProps) => {
  const useCall = () => useGetAllBusinessSummary().getAllBusinessSummary;

  return (
    <FiltersContainer
      onReset={() => {
        onChange?.({
          page: 1,
          dateFrom: undefined,
          dateTo: undefined,
          states: undefined,
          routeNames: undefined,
          hasBill: undefined
        });
      }}
    >
      <Formux<GetAllShoppingAdminQuery>
        value={{
          states: value?.states || [],
          routeNames: value?.routeNames || [],
          dateFrom: value?.dateFrom,
          dateTo: value?.dateTo,
          hasBill: value?.hasBill,
          wasAccepted: value?.wasAccepted
        }}
        onChange={(filters) => {
          onChange?.({
            ...filters,
            page: 1
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

              <div className="w-full flex items-center gap-10">
                <FieldSelectAsync
                  className="mt-2 max-w-80 flex-grow"
                  name="routeNames"
                  multi
                  label="Negocios"
                  useCall={useCall}
                  searchToArgs={(search) => ({ search })}
                  renderOption={({ name }) => name}
                  optionToValue={({ routeName }) => routeName}
                />

                <FieldRadioGroup<{ value: boolean | null; label: string }>
                  name="hasBill"
                  label="Facturada"
                  renderOption={({ checked, item }) => (
                    <FieldCheckbox noUseFormik value={checked} label={item.label} />
                  )}
                  optionToValue={({ value }) => value}
                  items={[
                    {
                      label: 'Si',
                      value: true
                    },
                    {
                      label: 'No',
                      value: false
                    },
                    {
                      label: 'Todas',
                      value: null
                    }
                  ]}
                  containerClassName="flex item-center flex-wrap gap-4 w-fit"
                />

                <FieldRadioGroup<{ value: boolean | null; label: string }>
                  name="wasAccepted"
                  label="Fue Aceptada"
                  renderOption={({ checked, item }) => (
                    <FieldCheckbox noUseFormik value={checked} label={item.label} />
                  )}
                  description="El estado actual es ACEPTADO o lo tiene en el historial"
                  optionToValue={({ value }) => value}
                  items={[
                    {
                      label: 'Si',
                      value: true
                    },
                    {
                      label: 'Todas',
                      value: null
                    }
                  ]}
                  containerClassName="flex item-center flex-wrap gap-4 w-fit"
                />
              </div>

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
    </FiltersContainer>
  );
};
