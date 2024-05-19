import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput, FieldInputProps } from 'components/field-input';
import { useFormField } from 'components/formux/useFormField';

import { isNumber } from 'utils/general';

export interface FieldPostStockAmountProps extends FieldInputProps {}

export const FieldPostStockAmount = ({ label, ...props }: FieldPostStockAmountProps) => {
  const { field } = useFormField(props);

  return (
    <FieldInput
      {...props}
      disabled={!isNumber(field.value)}
      label={
        <div className="flex items-center gap-2">
          {label}
          <FieldCheckbox
            noUseFormik
            value={isNumber(field.value)}
            onChange={(e) => {
              field.onChange({
                target: {
                  name: field.name,
                  value: e.target.checked ? 0 : null,
                },
              });
            }}
          />
        </div>
      }
      type="number"
    />
  );
};
