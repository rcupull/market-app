import { FieldCheckbox } from 'components/field-checkbox';
import { RadioGroup } from 'components/radio-group';

import { GetAllBillsQuery } from 'types/api';
import { BillState } from 'types/billing';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

type Value = BillState | 'ALL';

export interface FiltersProps extends StyleProps {
  onChange?: (filters: Omit<GetAllBillsQuery, 'routeName'>) => void;
  value?: Omit<GetAllBillsQuery, 'routeName'>;
}

export const Filters = ({ onChange, value, className }: FiltersProps) => {
  const getValue = (): Value => {
    return value?.states?.length === 1 ? value.states[0] : 'ALL';
  };

  const handleChange = (state: Value) => {
    if (state === 'ALL') {
      return onChange?.({ page: 1, states: undefined });
    }
    onChange?.({ page: 1, states: [state] });
  };

  return (
    <RadioGroup<{ label: string; value: Value }>
      onChange={handleChange}
      value={getValue()}
      renderOption={({ checked, item }) => (
        <FieldCheckbox noUseFormik value={checked} label={item.label} />
      )}
      optionToValue={({ value }) => value}
      items={[
        {
          label: 'Pendiente a Pagar',
          value: 'PENDING_TO_PAY',
        },
        {
          label: 'Chequeando Pago',
          value: 'CANCELED',
        },
        {
          label: 'Pagado',
          value: 'PAID',
        },
        {
          label: 'Todas',
          value: 'ALL',
        },
      ]}
      className={cn('flex flex-wrap items-center gap-4 mb-5', className)}
    />
  );
};
