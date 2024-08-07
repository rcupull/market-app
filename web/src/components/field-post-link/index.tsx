import { FieldCheckbox } from 'components/field-checkbox';
import { FieldInput } from 'components/field-input';
import { FieldRadioGroup, FieldRadioGroupProps } from 'components/field-radio-group';
import { FieldSelectAsync } from 'components/field-select-async';
import { useFormField } from 'components/formux/useFormField';

import { useGetAllBusiness } from 'features/api/business/useGetAllBusiness';

import { PostLinkType } from 'types/post';
import { getRequiredLabel } from 'utils/form';

export interface FieldPostsSectionLayoutProps
  extends Omit<FieldRadioGroupProps, 'items' | 'renderOption' | 'optionToValue'> {}

export const FieldPostLink = (props: FieldPostsSectionLayoutProps) => {
  const { field, getNestedFieldName } = useFormField(props);

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
            label: 'Hacia un negocio'
          },
          {
            value: 'external',
            label: 'Externo'
          }
        ]}
        containerClassName="flex items-center gap-4"
        label={getRequiredLabel('Tipo de enlace')}
        name={getNestedFieldName('type')}
        onChange={() =>
          field.onChange({
            target: {
              name: field.name,
              value: {
                type: 'business',
                value: ''
              }
            }
          })
        }
      />
      {field.value?.type === 'external' && (
        <FieldInput
          className="mt-6"
          placeholder="Escriba el enlace externo. Ex: https://example.com"
          name={getNestedFieldName('value')}
        />
      )}
      {field.value?.type === 'business' && (
        <FieldSelectAsync
          className="mt-6"
          name={getNestedFieldName('value')}
          useCall={useCall}
          searchToArgs={(search) => ({ search })}
          renderOption={({ name }) => name}
          optionToValue={({ routeName }) => routeName}
        />
      )}
    </div>
  );
};
