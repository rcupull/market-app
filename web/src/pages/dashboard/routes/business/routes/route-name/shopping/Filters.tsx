import { FieldCheckbox } from 'components/field-checkbox';
import { FiltersContainer } from 'components/filters-container';
import { RadioGroup } from 'components/radio-group';

import { allStatesQuery } from './utils';

import { GetAllShoppingQuery } from 'types/api';
import { StyleProps } from 'types/general';
import { ShoppingState } from 'types/shopping';
import { cn } from 'utils/general';

type Value = ShoppingState | 'ALL';

export interface FiltersProps extends StyleProps {
  onChange?: (filters: Omit<GetAllShoppingQuery, 'routeName'>) => void;
  value?: Omit<GetAllShoppingQuery, 'routeName'>;
}

export const Filters = ({ onChange, value, className }: FiltersProps) => {
  const getValue = (): Value => {
    return value?.states?.length === 1 ? value.states[0] : 'ALL';
  };

  const handleChange = (state: Value) => {
    if (state === 'ALL') {
      return onChange?.({ page: 1, states: allStatesQuery });
    }
    onChange?.({ page: 1, states: [state] });
  };

  return (
    <FiltersContainer
      onReset={() => {
        onChange?.({ page: 1, states: ['REQUESTED'] });
      }}
    >
      <RadioGroup<{ label: string; value: Value }>
        onChange={handleChange}
        value={getValue()}
        renderOption={({ checked, item }) => (
          <FieldCheckbox noUseFormik value={checked} label={item.label} />
        )}
        optionToValue={({ value }) => value}
        items={[
          {
            label: 'Todas',
            value: 'ALL',
          },
          {
            label: 'Solicitados',
            value: 'REQUESTED',
          },
          {
            label: 'Aceptados',
            value: 'APPROVED',
          },
          {
            label: 'En proceso',
            value: 'PROCESSING',
          },
          {
            label: 'Entregados',
            value: 'DELIVERED',
          },
          {
            label: 'Rechazadas',
            value: 'REJECTED',
          },
        ]}
        className={cn('flex items-center gap-4 mb-5 flex-wrap w-full', className)}
      />
    </FiltersContainer>
  );
};
