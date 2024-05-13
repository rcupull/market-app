import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput } from 'components/field-input';
import { FieldRadioGroup, FieldRadioGroupProps } from 'components/field-radio-group';
import { FieldSelectAsync } from 'components/field-select-async';

import { useGetAllBusiness } from 'features/api/business/useGetAllBusiness';

import { useFormikField } from 'hooks/useFormikField';
import { useNestedForm } from 'hooks/useNestedForm';

import { PostLink, PostLinkType } from 'types/post';

export interface FieldPostsSectionLayoutProps
  extends Omit<FieldRadioGroupProps, 'items' | 'renderOption' | 'optionToValue'> {}

export const FieldPostLink = (props: FieldPostsSectionLayoutProps) => {
  const { field } = useFormikField(props);

  const { getFieldName, value, reset } = useNestedForm<PostLink>({
    field,
    initialValues: {
      type: 'business',
      value: '',
    },
  });

  const useCall = () => useGetAllBusiness().getAllBusiness;

  return (
    <div>
      <FieldRadioGroup<{ value: PostLinkType; label: string }>
        renderOption={({ checked, item }) => {
          return <FieldCheckbox noUseFormik value={checked} label={item.label} />;
        }}
        optionToValue={({ value }) => value}
        items={[
          {
            value: 'business',
            label: 'Hacia un negocio',
          },
          {
            value: 'external',
            label: 'Externo',
          },
        ]}
        containerClassName="flex items-center gap-4"
        label="Tipo de enlace"
        name={getFieldName('type')}
        onChange={() => reset()}
      />
      {value?.type === 'external' && (
        <FieldInput
          className="mt-6"
          placeholder="Escriba el enlace externo. Ex: https://example.com"
          name={getFieldName('value')}
        />
      )}
      {value?.type === 'business' && (
        <FieldSelectAsync
          className="mt-6"
          name={getFieldName('value')}
          useCall={useCall}
          searchToArgs={(search) => ({ search })}
          renderOption={({ name }) => name}
          optionToValue={({ routeName }) => routeName}
        />
      )}
    </div>
  );
};
