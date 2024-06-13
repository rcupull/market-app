import { FieldCheckbox } from 'components/field-checkbox';
import { RadioGroup } from 'components/radio-group';

import { GetAllShoppingAdminQuery } from 'types/api';
import { StyleProps } from 'types/general';
import { ShoppingState } from 'types/shopping';
import { cn } from 'utils/general';
import { getShoppingStateLabel } from 'utils/shopping';

type Value = ShoppingState | 'ALL';

export interface FiltersProps extends StyleProps {
  onChange?: (filters: GetAllShoppingAdminQuery) => void;
  value?: GetAllShoppingAdminQuery;
}

export const Filters = ({ onChange, value, className }: FiltersProps) => {
  const getValue = (): Value => {
    return value?.states?.length === 1 ? value.states[0] : 'ALL';
  };

  const handleChange = (state: Value) => {
    if (state === 'ALL') {
      return onChange?.({ page: 1, states: [] });
    }
    onChange?.({ page: 1, states: [state] });
  };

  return (
    <RadioGroup<{ value: Value }>
      onChange={handleChange}
      value={getValue()}
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
          value: 'INVOICED',
        },
        {
          value: 'CANCELED',
        },
        {
          value: 'REJECTED',
        },
      ]}
      className={cn('flex items-center gap-4 mb-5 flex-wrap', className)}
    />
  );
};
