import { forwardRef } from 'react';

import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';
import { InputProps } from 'components/input';

import { Nullable } from 'types/general';
export interface FieldInputFileProps extends InputProps, FormFieldWrapperProps {
  error?: Nullable<string>;
}

export const FieldInputFile = forwardRef<HTMLInputElement, FieldInputFileProps>((props, ref) => {
  const { className, label, description, error: errorProp, children, ...omittedProps } = props;

  const { field, error } = useFormField(props);
  const {  onBlur, onChange, name } = field;

  return (
    <FormFieldWrapper
      label={label}
      error={errorProp ?? error}
      description={description}
      className={className}
    >
      <label>
        {children}
        <input
          type="file"
          name={name}
          className="sr-only"
          value=""
          ref={ref}
          {...omittedProps}
          onChange={(event) => {
            onBlur({
              target: {
                name
              }
            });

            onChange({
              target: {
                name,
                value: event.target.files?.[0]
              }
            });
          }}
        />
      </label>
    </FormFieldWrapper>
  );
});
