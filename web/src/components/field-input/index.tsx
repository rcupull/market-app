import { forwardRef } from 'react';

import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { Input } from 'components/input';

import { useFormikField } from 'hooks/useFormikField';

import { cn, isNullOrUndefined } from 'utils/general';

export interface FieldInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    FormFieldWrapperProps {}

export const FieldInput = forwardRef<HTMLInputElement, FieldInputProps>((props, ref) => {
  const { className, label, description, ...omittedProps } = props;

  const { field, error } = useFormikField(props);

  const { value, ...restField } = field;

  return (
    <FormFieldWrapper label={label} error={error} description={description} className={className}>
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
