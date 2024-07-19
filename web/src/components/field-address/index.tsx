import { ButtonDescription } from 'components/button-decription';
import { FieldInput } from 'components/field-input';
import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';

import SvgExclamationTriangleSolid from 'icons/ExclamationTriangleSolid';
import { ButtonMapLocation } from 'pages/@modals/useUserUpdateSettingsModal/ButtonMapLocation';
import { Address } from 'types/general';
import { getImportantLabel } from 'utils/form';
import { cn } from 'utils/general';
import { getIsValidAddress } from 'utils/validation';

export interface FieldAddressProps extends FormFieldWrapperProps {
  collapsable?: boolean;
  name?: string;
}

export const FieldAddress = (props: FieldAddressProps) => {
  const { getNestedFieldName, field } = useFormField<Address>(props);

  const { lat, lon } = field.value || {};

  const hasCoordinates = lat && lon;

  const renderAddresEditor = () => {
    if (!hasCoordinates) {
      return (
        <div className="flex flex-col items-center">
          <div className="flex items-center text-gray-500">Click para agregar ubicación</div>
          <ButtonMapLocation
            size="large"
            value={field.value}
            onChange={(newAddress) => {
              field.onChange({ target: { name: field.name, value: newAddress } });
            }}
          />
        </div>
      );
    }

    const isValidAddress = field.value && getIsValidAddress(field.value);

    return (
      <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col items-center start-0 col-span-1 sm:col-span-2">
          <div className="flex items-center justify-center text-gray-500 w-full ">
            <ButtonMapLocation
              size="medium"
              value={field.value}
              onChange={(newAddress) => {
                field.onChange({ target: { name: field.name, value: newAddress } });
              }}
            />
            Click para editar ubicación
            <ButtonDescription
              svg={({ className }) => (
                <SvgExclamationTriangleSolid className={cn('fill-red-500', className)} />
              )}
              description={
                <span>
                  La dirección obtenida mediante el mapa es una aproximación que puede tener
                  errores. Es <span className="font-bold">responsabilidad de cada usuario</span>{' '}
                  verificar que los datos sean correctos directamente el el formulario.
                </span>
              }
            />
          </div>

          {!isValidAddress && (
            <span className="text-red-400 font-bold">(Dirección incompleta)</span>
          )}
        </div>

        <FieldInput label="Latitud" disabled name={getNestedFieldName('lat')} />

        <FieldInput label="Longitud" disabled name={getNestedFieldName('lon')} />

        <FieldInput label={getImportantLabel('Calle')} name={getNestedFieldName('street')} />

        <FieldInput label={getImportantLabel('Número')} name={getNestedFieldName('number')} />

        <FieldInput
          label={getImportantLabel('Apartamento')}
          name={getNestedFieldName('apartment')}
        />

        <FieldInput label="Entre calle 1" name={getNestedFieldName('streetBetweenFrom')} />
        <FieldInput label="Entre calle 2" name={getNestedFieldName('streetBetweenTo')} />

        <FieldInput label="Reparto" name={getNestedFieldName('neighborhood')} />

        <FieldInput
          label={getImportantLabel('Municipio')}
          name={getNestedFieldName('municipality')}
        />

        <FieldInput label={getImportantLabel('Ciudad')} name={getNestedFieldName('city')} />
      </div>
    );
  };

  return <FormFieldWrapper {...props}>{renderAddresEditor()}</FormFieldWrapper>;
};
