import { useState } from 'react';

import { Accordion } from 'components/accordion';
import { Divider } from 'components/divider';
import { FieldCheckbox } from 'components/field-checkbox';
import { FieldPostShoppingMethodSelect } from 'components/field-post-shopping-method-select';
import { FieldRadioGroup } from 'components/field-radio-group';
import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';

import { FormikFieldProps, useFormikField } from 'hooks/useFormikField';
import { useNestedForm } from 'hooks/useNestedForm';

import { DummyPostCard } from './components/dummy-post-card';

import {
  PostCardLayout,
  PostCardLayoutDiscount,
  PostCardLayoutImages,
  PostCardLayoutMetaLayout,
  PostCardLayoutName,
  PostCardLayoutPrice,
  PostCardSize,
} from 'types/business';
import { AnyRecord } from 'types/general';
import { cn } from 'utils/general';

export interface FieldPostCardLayoutProps
  extends FormFieldWrapperProps,
    FormikFieldProps<AnyRecord> {
  collapsable?: boolean;
}

export const FieldPostCardLayout = ({
  className,
  label,
  collapsable,
  ...props
}: FieldPostCardLayoutProps) => {
  const { field, error } = useFormikField(props);

  const { getFieldName, value } = useNestedForm<PostCardLayout>({
    field,
    initialValues: {
      images: 'static',
      size: 'medium',
      metaLayout: 'basic',
      discount: 'none',
      name: 'basic',
      price: 'smallerCurrency',
      shoppingMethod: 'shoppingCart',
    },
  });

  const [showPreview, setShowPreview] = useState(false);

  const content = (
    <div className="flex flex-col lg:flex-row gap-2 items-center lg:items-start">
      <div className="w-full px-6">
        <div className="flex flex-col justify-around h-full gap-2">
          <FieldRadioGroup<{ value: PostCardLayoutImages; label: string }>
            label="Imágenes"
            name={getFieldName('images')}
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
            name={getFieldName('size')}
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
            name={getFieldName('metaLayout')}
            renderOption={({ checked, item }) => {
              return <FieldCheckbox noUseFormik value={checked} label={item.label} />;
            }}
            optionToValue={({ value }) => value}
            items={[
              {
                value: 'basic',
                label: 'Basico',
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
            name={getFieldName('name')}
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
                label: 'Basico',
              },
            ]}
            containerClassName="flex items-center flex-wrap gap-4"
          />

          <Divider className="!my-2" />

          <FieldRadioGroup<{ value: PostCardLayoutPrice; label: string }>
            label="Precio"
            name={getFieldName('price')}
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
            name={getFieldName('discount')}
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
            label="Adiccionar al carro"
            name={getFieldName('shoppingMethod')}
            className="w-full"
          />
        </div>
      </div>
      {showPreview && (
        <div className="flex justify-center items-center w-96 flex-shrink-0 h-[25rem]">
          <div className="border border-dashed border-gray-400 w-fit h-fit">
            <DummyPostCard postCardLayout={value} />
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
