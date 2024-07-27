import {
  DateTimePickerCollapsable,
  DateTimePickerCollapsableProps,
} from 'components/date-time-picker-collapsable';
import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';

import { isValidStrDate } from 'utils/date';

export interface FieldDateTimePickerCollapsableProps
  extends FormFieldWrapperProps,
    DateTimePickerCollapsableProps {
  name?: string;
}

export const FieldDateTimePickerCollapsable = (
  props: FieldDateTimePickerCollapsableProps,
): JSX.Element => {
  const { label, className, description, ...omittedProps } = props;
  const { field, error } = useFormField(props);

  return (
    <FormFieldWrapper label={label} error={error} className={className} description={description}>
      <DateTimePickerCollapsable
        {...omittedProps}
        onChange={(date) => {
          field.onChange({
            target: {
              name: field.name,
              value: date.toISOString(),
            },
          });
        }}
        value={isValidStrDate(field.value) ? new Date(field.value) : undefined}
      />
    </FormFieldWrapper>
  );
};
