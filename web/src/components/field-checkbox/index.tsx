import { forwardRef } from 'react';

import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { FormikWrapper } from 'components/formik-wrapper';

import { cn } from 'utils/general';

export interface FieldCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'>,
    FormFieldWrapperProps {
  noUseFormik?: boolean;
  value?: boolean;
}

export const FieldCheckbox = forwardRef<HTMLInputElement, FieldCheckboxProps>((allProps, ref) => {
  const { noUseFormik, ...props } = allProps;

  if (noUseFormik) {
    const { className, label, value, onChange, description, ...omittedProps } = props;

    return (
      <FormFieldWrapper
        label={label}
        description={description}
        className={cn('w-fit', className)}
        labelPosition="right"
      >
        <input
          ref={ref}
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange?.(e)}
          className={cn('block w-5 h-5 rounded-md')}
          {...omittedProps}
        />
      </FormFieldWrapper>
    );
  }

  return (
    <FormikWrapper {...props}>
      {({ error, field }) => {
        const { className, label, description, ...omittedProps } = props;
        const { value = '', ...restField } = field;

        return (
          <FormFieldWrapper
            label={label}
            description={description}
            error={error}
            className={cn('w-fit', className)}
            labelPosition="right"
          >
            <input
              ref={ref}
              type="checkbox"
              className={cn('block w-5 h-5 rounded-md')}
              {...omittedProps}
              value={value}
              {...restField}
            />
          </FormFieldWrapper>
        );
      }}
    </FormikWrapper>
  );
});
