import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';
import { ToggleButton } from 'components/toggle-button';

import { StyleProps } from 'types/general';

export interface FieldToggleButtonProps
  extends StyleProps,
    FormFieldWrapperProps {
  onChange?: (e: React.ChangeEvent) => void;
  name?:string
}

export const FieldToggleButton = (props: FieldToggleButtonProps) => {
  const { label, className, description } = props;

  const { field, error } = useFormField(props);
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
