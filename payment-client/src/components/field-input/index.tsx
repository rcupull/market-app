import { forwardRef, useEffect, useRef } from 'react';

import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';
import { Input, InputProps } from 'components/input';

import { Nullable } from 'types/general';
import { cn, isNullOrUndefined } from 'utils/general';
import { mergeRefs } from 'utils/view';

export interface FieldInputProps extends InputProps, FormFieldWrapperProps {
  error?: Nullable<string>;
  autoFocusDelay?: number;
}

export const FieldInput = forwardRef<HTMLInputElement, FieldInputProps>((props, ref) => {
  const {
    className,
    label,
    description,
    error: errorProp,
    autoFocus,
    autoFocusDelay = 0,
    ...omittedProps
  } = props;

  const refInternal = useRef<HTMLInputElement>(null);
  const { field, error } = useFormField(props);

  const { value, ...restField } = field;

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => refInternal.current?.focus(), autoFocusDelay);
    }
  }, []);

  return (
    <FormFieldWrapper
      label={label}
      error={errorProp ?? error}
      description={description}
      className={className}
    >
      <Input
        ref={mergeRefs([refInternal, ref])}
        className={cn({
          'ring-1 rounded-md ring-red-500 focus:ring-red-500': !!error
        })}
        {...omittedProps}
        value={isNullOrUndefined(value) ? '' : value}
        {...restField}
      />
    </FormFieldWrapper>
  );
});
