import { Accordion } from 'components/accordion';
import { FieldPostsSectionSelect } from 'components/field-posts-section-select';
import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';

import { FormikFieldProps, useFormikField } from 'hooks/useFormikField';

import { AnyRecord } from 'types/general';
import { getNestedFieldName } from 'utils/form';
import { cn } from 'utils/general';

export interface FieldPostPageLayoutProps
  extends FormFieldWrapperProps,
    FormikFieldProps<AnyRecord> {
  collapsable?: boolean;
}

export const FieldPostPageLayout = ({
  className,
  label,
  collapsable,
  ...props
}: FieldPostPageLayoutProps) => {
  const { field, error } = useFormikField(props);

  const content = (
    <div className="flex flex-col justify-around h-full px-6 gap-2">
      <FieldPostsSectionSelect
        label="Secciones similares"
        name={getNestedFieldName(field, 'postsSectionsBelowIds')}
        className="mt-6"
      />
    </div>
  );
  return (
    <FormFieldWrapper label={label} error={error} className={cn(className)}>
      {collapsable ? <Accordion header="Abrir">{content}</Accordion> : content}
    </FormFieldWrapper>
  );
};
