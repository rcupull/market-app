import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { RadioGroup, RadioGroupProps } from 'components/radio-group';

import { FormikFieldProps, useFormikField } from 'hooks/useFormikField';

export interface FieldRadioGroupProps<O, V>
  extends FormFieldWrapperProps,
    FormikFieldProps<V>,
    Omit<RadioGroupProps<O>, 'onChange' | 'onBlur'> {
  containerClassName?: string;
}
//eslint-disable-next-line
export const FieldRadioGroup = <O extends any = any, V = any>(
  props: FieldRadioGroupProps<O, V>,
) => {
  const {
    label,
    className,
    optionToValue,
    renderOption,
    items,
    isBusy,
    multi,
    containerClassName,
    disabledOption,
  } = props;
  const { field, error } = useFormikField<V>(props);

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <RadioGroup
        items={items}
        optionToValue={optionToValue}
        renderOption={renderOption}
        disabledOption={disabledOption}
        isBusy={isBusy}
        multi={multi}
        onBlur={() => {
          field.onBlur({
            target: {
              name: field.name,
            },
          });
        }}
        onChange={(newValue) => {
          field.onChange({
            target: {
              value: newValue,
              name: field.name,
            },
          });
        }}
        value={field.value || null}
        className={containerClassName}
      />
    </FormFieldWrapper>
  );
};
