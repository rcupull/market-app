import { useState } from 'react';

import { Accordion } from 'components/accordion';
import { Divider } from 'components/divider';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldPostShoppingMethodSelect } from 'components/field-post-shopping-method-select';
import { FieldRadioGroup } from 'components/field-radio-group';
import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';
import { useFormField } from 'components/formux/useFormField';

import { DummyPostCard } from './components/dummy-post-card';

import {
  PostCardLayoutDiscount,
  PostCardLayoutImages,
  PostCardLayoutMetaLayout,
  PostCardLayoutName,
  PostCardLayoutPrice,
  PostCardSize,
} from 'types/business';
import { cn } from 'utils/general';

export interface FieldPostCardLayoutProps extends FormFieldWrapperProps {
  collapsable?: boolean;
  name?: string;
}

export const FieldPostCardLayout = ({
  className,
  label,
  collapsable,
  ...props
}: FieldPostCardLayoutProps) => {
  const { field, error, getNestedFieldName } = useFormField(props);

  const [showPreview, setShowPreview] = useState(true);

  const content = (
    <div className="flex flex-col lg:flex-row gap-2 items-center lg:items-start">
      <div className="w-full px-6">
        <div className="flex flex-col justify-around h-full gap-2">
          <FieldRadioGroup<{ value: PostCardLayoutImages; label: string }>
            label="Imágenes"
            name={getNestedFieldName('images')}
            renderOption={({ checked, item }) => {
              return <FieldCheckbox noUseFormik value={checked} label={item.label} />;
            }}
            optionToValue={({ value }) => value}
            items={[
              {
                value: 'static',
                label: 'Estatico',
              },
              {
                value: 'hoverZoom',
                label: 'Zoom con el mouse',
              },
              {
                value: 'slider',
                label: 'Deslizante',
              },
              {
                value: 'switch',
                label: 'Alternado',
              },
              {
                value: 'rounded',
                label: 'Redondo',
              },
            ]}
            containerClassName="flex items-center flex-wrap gap-4"
          />

          <Divider className="!my-2" />

          <FieldRadioGroup<{ value: PostCardSize; label: string }>
            label="Tamaño"
            name={getNestedFieldName('size')}
            renderOption={({ checked, item }) => {
              return <FieldCheckbox noUseFormik value={checked} label={item.label} />;
            }}
            optionToValue={({ value }) => value}
            items={[
              {
                value: 'small',
                label: 'Pequeño',
              },
              {
                value: 'medium',
                label: 'Mediano',
              },
              {
                value: 'long',
                label: 'Largo',
              },
            ]}
            containerClassName="flex items-center flex-wrap gap-4"
          />

          <Divider className="!my-2" />

          <FieldRadioGroup<{ value: PostCardLayoutMetaLayout; label: string }>
            label="Diseño de los metadatos"
            name={getNestedFieldName('metaLayout')}
            description={
              <div>
                Los metadatos son el conjunto de detalles que se muestran de una publicación.
                Incluye el nombre, precio, descuento, etc. Todos los metadatos se muestran en la
                parte inferior de la imagen.
              </div>
            }
            renderOption={({ checked, item }) => {
              return <FieldCheckbox noUseFormik value={checked} label={item.label} />;
            }}
            optionToValue={({ value }) => value}
            items={[
              {
                value: 'basic',
                label: 'Básico',
              },
              {
                value: 'verticalCentered',
                label: 'Centrado verticalmente',
              },
            ]}
            containerClassName="flex items-center flex-wrap gap-4"
          />

          <Divider className="!my-2" />

          <FieldRadioGroup<{ value: PostCardLayoutName; label: string }>
            label="Nombre"
            name={getNestedFieldName('name')}
            renderOption={({ checked, item }) => {
              return <FieldCheckbox noUseFormik value={checked} label={item.label} />;
            }}
            optionToValue={({ value }) => value}
            items={[
              {
                value: 'none',
                label: 'Ninguno',
              },
              {
                value: 'basic',
                label: 'Básico',
              },
            ]}
            containerClassName="flex items-center flex-wrap gap-4"
          />

          <Divider className="!my-2" />

          <FieldRadioGroup<{ value: PostCardLayoutPrice; label: string }>
            label="Precio"
            name={getNestedFieldName('price')}
            renderOption={({ checked, item }) => {
              return <FieldCheckbox noUseFormik value={checked} label={item.label} />;
            }}
            optionToValue={({ value }) => value}
            items={[
              {
                value: 'none',
                label: 'Ninguno',
              },
              {
                value: 'basic',
                label: 'Básico',
              },
              {
                value: 'smallerCurrency',
                label: 'Moneda reducida',
              },
              {
                value: 'usdCurrencySymbol',
                label: 'Símbolo de USD',
              },
            ]}
            containerClassName="flex items-center flex-wrap gap-4"
          />

          <Divider className="!my-2" />

          <FieldRadioGroup<{ value: PostCardLayoutDiscount; label: string }>
            label="Descuento"
            name={getNestedFieldName('discount')}
            renderOption={({ checked, item }) => {
              return <FieldCheckbox noUseFormik value={checked} label={item.label} />;
            }}
            optionToValue={({ value }) => value}
            items={[
              {
                value: 'none',
                label: 'Ninguno',
              },
              {
                value: 'savedMoney',
                label: 'En dinero',
              },
              {
                value: 'savedPercent',
                label: 'En porciento',
              },
            ]}
            containerClassName="flex items-center flex-wrap gap-4"
          />

          <Divider className="!my-2" />

          <FieldPostShoppingMethodSelect
            name={getNestedFieldName('shoppingMethod')}
            label="Método de compra"
          />
        </div>
      </div>
      {showPreview && (
        <div className="flex justify-center items-center w-96 flex-shrink-0 h-[25rem]">
          <div className="border border-dashed border-gray-400 w-fit h-fit">
            <DummyPostCard postCardLayout={field.value} />
          </div>
        </div>
      )}
    </div>
  );
  return (
    <FormFieldWrapper
      label={
        <div className="flex flex-wrap gap-1">
          <span>{label}</span>
          <div
            className="text-indigo-500 cursor-pointer"
            onClick={() => setShowPreview(!showPreview)}
          >{`${showPreview ? '(Ocultar vista previa)' : '(Mostrar vista previa)'}`}</div>
        </div>
      }
      error={error}
      className={cn(className)}
      description={
        <div>
          Escoja el diseño de las tarjetas de cada publicación que mejor se ajusta a sus
          necesidades. Pueden haber grupo de publicaciones promocionales, recientes, categorizadas,
          incluso referencias a las páginas de otros negocios de Asere Market o link externos.
        </div>
      }
    >
      {collapsable ? <Accordion header="Abrir">{content}</Accordion> : content}
    </FormFieldWrapper>
  );
};
