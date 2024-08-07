import { forwardRef } from 'react';

import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';

import { cn } from 'utils/general';

export interface FieldTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    FormFieldWrapperProps {}

export const FieldTextArea = forwardRef<HTMLTextAreaElement, FieldTextAreaProps>((props, ref) => {
  const { className, label, ...omittedProps } = props;

  const { field, error } = useFormField(props);

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <textarea
        ref={ref}
        className={cn(
          'p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
          {
            'ring-1 rounded-md ring-red-500 focus:ring-red-500': !!error
          }
        )}
        {...omittedProps}
        {...field}
      />
    </FormFieldWrapper>
  );
});
