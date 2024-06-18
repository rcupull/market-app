import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';
import { RadioGroup, RadioGroupProps } from 'components/radio-group';

export interface FieldRadioGroupProps<O = any>
  extends FormFieldWrapperProps,
    Omit<RadioGroupProps<O>, 'onChange' | 'onBlur'> {
  containerClassName?: string;
  name?: string;
  onChange?: (value: any) => void;
}
//eslint-disable-next-line
export const FieldRadioGroup = <O extends any = any>(props: FieldRadioGroupProps<O>) => {
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
    onChange,
  } = props;
  const { field, error } = useFormField(props);

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
          onChange?.(newValue);

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
        value={field.value === undefined ? null : field.value}
        className={containerClassName}
      />
    </FormFieldWrapper>
  );
};
