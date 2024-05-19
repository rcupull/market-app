import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput } from 'components/field-input';
import { FieldRadioGroup, FieldRadioGroupProps } from 'components/field-radio-group';
import { FieldSelectAsync } from 'components/field-select-async';

import { useGetAllBusiness } from 'features/api/business/useGetAllBusiness';

import { useFormikField } from 'hooks/useFormikField';

import { PostLinkType } from 'types/post';
import { getNestedFieldName } from 'utils/form';

export interface FieldPostsSectionLayoutProps
  extends Omit<FieldRadioGroupProps, 'items' | 'renderOption' | 'optionToValue'> {}

export const FieldPostLink = (props: FieldPostsSectionLayoutProps) => {
  const { field } = useFormikField(props);

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
        name={getNestedFieldName(field, 'type')}
        onChange={() =>
          field.onChange({
            target: {
              name: field.name,
              value: {
                type: 'business',
                value: '',
              },
            },
          })
        }
      />
      {field.value?.type === 'external' && (
        <FieldInput
          className="mt-6"
          placeholder="Escriba el enlace externo. Ex: https://example.com"
          name={getNestedFieldName(field, 'value')}
        />
      )}
      {field.value?.type === 'business' && (
        <FieldSelectAsync
          className="mt-6"
          name={getNestedFieldName(field, 'value')}
          useCall={useCall}
          searchToArgs={(search) => ({ search })}
          renderOption={({ name }) => name}
          optionToValue={({ routeName }) => routeName}
        />
      )}
    </div>
  );
};
