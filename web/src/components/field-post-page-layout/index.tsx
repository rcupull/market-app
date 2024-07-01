import { Accordion } from 'components/accordion';
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
  const { error } = useFormField(props);

  const content = (
    <div className="flex flex-col justify-around h-full px-6 gap-2">
      TODO: Nothing by now
      {/* <FieldPostsSectionSelect
        label="Secciones relacionadas"
        description={
          <div>
            Las secciones relacionadas se muestran debajo de los detalles del producto y permiten
            que el usuario mantenga un flujo de navegación con publicaciones similares a la actual.
          </div>
        }
        name={getNestedFieldName('postsSectionsBelowIds')}
        className="mt-6"
      /> */}
    </div>
  );
  return (
    <FormFieldWrapper label={label} error={error} className={cn(className)}>
      {collapsable ? <Accordion header="Abrir">{content}</Accordion> : content}
    </FormFieldWrapper>
  );
};
