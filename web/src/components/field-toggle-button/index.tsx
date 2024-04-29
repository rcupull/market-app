import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { ToggleButton } from 'components/toggle-button';

import { FormikFieldProps, useFormikField } from 'hooks/useFormikField';

import { StyleProps } from 'types/general';

export interface FieldToggleButtonProps
  extends StyleProps,
    FormFieldWrapperProps,
    FormikFieldProps<boolean> {
  onChange?: (e: React.ChangeEvent) => void;
}

export const FieldToggleButton = (props: FieldToggleButtonProps) => {
  const { label, className, description } = props;

  const { field, error } = useFormikField(props);
  const { value } = field;

  return (
    <FormFieldWrapper label={label} error={error} className={className} description={description}>
      <ToggleButton
        value={value}
        onChange={(newValue) => {
          field.onChange({
            target: {
              name: field.name,
              value: newValue,
            },
          });
        }}
      />
    </FormFieldWrapper>
  );
};
