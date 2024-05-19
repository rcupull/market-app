import { Accordion } from 'components/accordion';
import { FieldPostsSectionSelect } from 'components/field-posts-section-select';
import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';

import { cn } from 'utils/general';

export interface FieldPostPageLayoutProps extends FormFieldWrapperProps {
  collapsable?: boolean;
  name?: string;
}

export const FieldPostPageLayout = ({
  className,
  label,
  collapsable,
  ...props
}: FieldPostPageLayoutProps) => {
  const { error, getNestedFieldName } = useFormField(props);

  const content = (
    <div className="flex flex-col justify-around h-full px-6 gap-2">
      <FieldPostsSectionSelect
        label="Secciones similares"
        name={getNestedFieldName('postsSectionsBelowIds')}
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
