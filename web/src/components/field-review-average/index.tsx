import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';
import { ReviewAverage } from 'components/review-average';

import { StyleProps } from 'types/general';

export interface FieldReviewAverageProps extends StyleProps, FormFieldWrapperProps {
  name?: string;
}

export const FieldReviewAverage = (props: FieldReviewAverageProps) => {
  const { label, description, className } = props;

  const { field, error } = useFormField(props);

  return (
    <FormFieldWrapper label={label} error={error} className={className} description={description}>
      <ReviewAverage
        value={field.value}
        onChange={(newValue) => {
          field.onBlur({
            target: {
              name: field.name,
            },
          });

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
