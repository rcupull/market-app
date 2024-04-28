import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { RadioGroup, RadioGroupProps } from 'components/radio-group';

import { FormikFieldProps, useFormikField } from 'hooks/useFormikField';

export interface FieldRadioGroupProps<O = any, V = any>
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
    description,
    className,
    optionToValue,
    renderOption,
    items,
    isBusy,
    multi,
    containerClassName,
    disabledOption,
    onOptionClicked,
    getOptionCutomStyles,
  } = props;
  const { field, error } = useFormikField<V>(props);

  return (
    <FormFieldWrapper label={label} description={description} error={error} className={className}>
      <RadioGroup
        onOptionClicked={onOptionClicked}
        getOptionCutomStyles={getOptionCutomStyles}
        items={items}
        optionToValue={optionToValue}
        renderOption={renderOption}
        disabledOption={disabledOption}
        isBusy={isBusy}
        multi={multi}
        onChange={(newValue) => {
          field.onBlur({
            target: {
              name: field.name,
            },
          });

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
