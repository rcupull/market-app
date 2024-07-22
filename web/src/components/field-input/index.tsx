import { forwardRef } from 'react';

import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';
import { Input, InputProps } from 'components/input';

import { Nullable } from 'types/general';
import { cn, isNullOrUndefined } from 'utils/general';

export interface FieldInputProps extends InputProps, FormFieldWrapperProps {
  error?: Nullable<string>;
}

export const FieldInput = forwardRef<HTMLInputElement, FieldInputProps>((props, ref) => {
  const { className, label, description, error: errorProp, ...omittedProps } = props;

  const { field, error } = useFormField(props);

  const { value, ...restField } = field;

  return (
    <FormFieldWrapper
      label={label}
      error={errorProp ?? error}
      description={description}
      className={className}
    >
      <Input
        ref={ref}
        className={cn({
          'ring-1 rounded-md ring-red-500 focus:ring-red-500': !!error,
        })}
        {...omittedProps}
        value={isNullOrUndefined(value) ? '' : value}
        {...restField}
      />
    </FormFieldWrapper>
  );
});
