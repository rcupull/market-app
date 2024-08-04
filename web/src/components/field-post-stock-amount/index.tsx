import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput, FieldInputProps } from 'components/field-input';
import { FormFieldWrapper } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';

import { PostAmount } from 'pages/@common/post-amount';
import { Post } from 'types/post';
import { isNumber } from 'utils/general';

export interface FieldPostStockAmountProps extends FieldInputProps {
  post: Post | undefined;
  onAfterSuccess?: () => void;
}

export const FieldPostStockAmount = ({
  label: labelProp,
  post,
  onAfterSuccess,
  ...props
}: FieldPostStockAmountProps) => {
  const { field, error } = useFormField(props);

  const { className, description } = props;

  const label = (
    <div className="flex items-center gap-2">
      {labelProp}
      <FieldCheckbox
        noUseFormik
        value={isNumber(field.value)}
        onChange={(e) => {
          field.onChange({
            target: {
              name: field.name,
              value: e.target.checked ? 0 : null
            }
          });
        }}
      />
    </div>
  );

  if (post) {
    const { amountInProcess } = post;

    return (
      <FormFieldWrapper label={label} error={error} description={description} className={className}>
        <PostAmount
          value={field.value}
          postId={post._id}
          disabled={!isNumber(field.value)}
          onAfterSuccess={onAfterSuccess}
          error={field.value === 0}
          min={amountInProcess}
          size="large"
        />
      </FormFieldWrapper>
    );
  }

  return <FieldInput {...props} disabled={!isNumber(field.value)} label={label} type="number" />;
};
