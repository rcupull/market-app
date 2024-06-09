import { FieldCheckbox } from 'components/field-checkbox';
import { RadioGroup } from 'components/radio-group';

import { GetAllBillsQuery, GetAllPostsQuery } from 'types/api';
import { BillState } from 'types/billing';
import { StyleProps } from 'types/general';

export interface FiltersProps extends StyleProps {
  onChange?: (filters: Omit<GetAllBillsQuery, 'routeName'>) => void;
  value?: GetAllPostsQuery;
}

export const Filters = ({ onChange, value, className }: FiltersProps) => {
  return (
    <div className={className}>
      <RadioGroup<{ label: string; value: BillState }>
        onChange={(states) => {
          onChange?.({ page: 1, states });
        }}
        multi
        value={value}
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
            value: 'CHECKING_PAY',
          },
          {
            label: 'Pagado',
            value: 'PAID',
          },
        ]}
        className="flex items-center gap-2 mb-5"
      />
    </div>
  );
};
