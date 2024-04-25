import { useState } from 'react';

import { Accordion } from 'components/accordion';
import { FieldPostShoppingMethodSelect } from 'components/field-post-shopping-method-select';
import { FieldSelect } from 'components/field-select';
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
      shoppingMethod: undefined,
    },
  });

  const [showPreview, setShowPreview] = useState(false);

  const content = (
    <div className="flex flex-col lg:flex-row gap-2 items-center lg:items-start">
      <div className="w-full px-6">
        <div className="flex flex-col justify-around h-full gap-2">
          <FieldSelect<{ value: PostCardLayoutImages }>
            label="Imágenes"
            name={getFieldName('images')}
            renderOption={({ value }) => value}
            renderValue={({ value }) => value}
            optionToValue={({ value }) => value}
            items={[
              {
                value: 'static',
              },
              {
                value: 'hoverZoom',
              },
              {
                value: 'slider',
              },
              {
                value: 'switch',
              },
              {
                value: 'rounded',
              },
            ]}
            className="w-full"
          />

          <FieldSelect<{ value: PostCardSize }>
            label="Tamaño"
            name={getFieldName('size')}
            renderOption={({ value }) => value}
            renderValue={({ value }) => value}
            optionToValue={({ value }) => value}
            items={[
              {
                value: 'small',
              },
              {
                value: 'medium',
              },
              {
                value: 'long',
              },
            ]}
            className="w-full"
          />

          <FieldSelect<{ value: PostCardLayoutMetaLayout }>
            label="Diseño de los metadatos"
            name={getFieldName('metaLayout')}
            renderOption={({ value }) => value}
            renderValue={({ value }) => value}
            optionToValue={({ value }) => value}
            items={[
              {
                value: 'basic',
              },
              {
                value: 'verticalCentered',
              },
            ]}
            className="w-full"
          />

          <FieldSelect<{ value: PostCardLayoutName }>
            label="Nombre"
            name={getFieldName('name')}
            renderOption={({ value }) => value}
            renderValue={({ value }) => value}
            optionToValue={({ value }) => value}
            items={[
              {
                value: 'none',
              },
              {
                value: 'basic',
              },
            ]}
            className="w-full"
          />
          <FieldSelect<{ value: PostCardLayoutPrice }>
            label="Precio"
            name={getFieldName('price')}
            renderOption={({ value }) => value}
            renderValue={({ value }) => value}
            optionToValue={({ value }) => value}
            items={[
              {
                value: 'none',
              },
              {
                value: 'basic',
              },
              {
                value: 'smallerCurrency',
              },
              {
                value: 'usdCurrencySymbol',
              },
            ]}
            className="w-full"
          />
          <FieldSelect<{ value: PostCardLayoutDiscount }>
            label="Descuento"
            name={getFieldName('discount')}
            renderOption={({ value }) => value}
            renderValue={({ value }) => value}
            optionToValue={({ value }) => value}
            items={[
              {
                value: 'none',
              },
              {
                value: 'savedMoney',
              },
              {
                value: 'savedPercent',
              },
            ]}
            className="w-full"
          />

          <FieldPostShoppingMethodSelect
            label="Método de compra"
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
    >
      {collapsable ? <Accordion header="Abrir">{content}</Accordion> : content}
    </FormFieldWrapper>
  );
};
