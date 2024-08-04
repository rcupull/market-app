import { useEffect, useState } from 'react';

import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';
import { IconButtonAdd } from 'components/icon-button-add';

import { PostCategoriesFilterButtons } from '../post-categories-filter-buttons';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessUpdatePostCategoriesModal } from 'pages/@modals/useBusinessUpdatePostCategoriesModal';

type State = Array<string>;

export interface FieldPostCategoriesButtonsProps extends FormFieldWrapperProps {
  name?: string;
}

export const FieldPostCategoriesButtons = (props: FieldPostCategoriesButtonsProps) => {
  const { className, label, description } = props;
  const [state, setState] = useState<State>();

  const { field, error } = useFormField(props);

  const { value, onChange, name, onBlur } = field;

  const { business, onFetch } = useBusiness();

  const { businessUpdatePostCategoriesModal } = useBusinessUpdatePostCategoriesModal();

  useEffect(() => {
    setState(value);
  }, [value]);

  if (!business) {
    return <></>;
  }

  const postCategories = business?.postCategories;

  const iconAdd = (
    <IconButtonAdd
      title="Editar las categorías"
      className="text-green-600 font-bold ml-2"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        businessUpdatePostCategoriesModal.open({
          onAfterSuccess: () => business && onFetch({ routeName: business.routeName })
        });
      }}
    />
  );

  return (
    <FormFieldWrapper
      label={
        <div className="flex items-center">
          {label}
          {iconAdd}
        </div>
      }
      error={error}
      className={className}
      description={description}
    >
      <PostCategoriesFilterButtons
        postCategories={postCategories}
        onChange={(newState) => {
          onBlur({ target: { name } });

          setState(newState);

          onChange({
            target: {
              name,
              value: newState
            }
          });
        }}
        value={state}
        type="wrapped"
      />
    </FormFieldWrapper>
  );
};
