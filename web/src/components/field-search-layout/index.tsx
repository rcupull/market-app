import { useState } from 'react';

import { FieldCheckbox } from 'components/field-checkbox';
import { FieldRadioGroup, FieldRadioGroupProps } from 'components/field-radio-group';
import { useFormField } from 'components/formux/useFormField';

import { Skeleton } from './skeleton';

import { SearchLayoutType } from 'types/business';
import { getSearchLayoutLabel } from 'utils/business';
import { cn } from 'utils/general';

export interface FieldSearchLayoutProps
  extends Omit<FieldRadioGroupProps, 'items' | 'renderOption' | 'optionToValue'> {}

export const FieldSearchLayout = (props: FieldSearchLayoutProps) => {
  const { className, ...omittedProps } = props;
  const { label } = omittedProps;
  const [showPreview, setShowPreview] = useState(false);

  const { field } = useFormField(props);

  return (
    <div className={cn('flex flex-col lg:flex-row gap-2 items-center lg:items-start', className)}>
      <FieldRadioGroup<{ value: SearchLayoutType }>
        renderOption={({ checked, item }) => {
          return (
            <FieldCheckbox noUseFormik value={checked} label={getSearchLayoutLabel(item.value)} />
          );
        }}
        description={
          <div>
            Escoja como quiere que el usuario busque en sus publicaciones. En caso de seleccionar{' '}
            <span className="font-bold">Ninguno</span> todas las publicaciones serán mostradas en el
            mismo orden que aparecen, haciendo scrolling hacia abajo para visualizar las siguientes.
          </div>
        }
        optionToValue={({ value }) => value}
        items={[
          {
            value: 'none',
          },
          {
            value: 'left',
          },
          {
            value: 'center',
          },
          {
            value: 'right',
          },
          {
            value: 'postCategories',
          },
          {
            value: 'postCategoriesScrollable',
          },
          {
            value: 'postCategoriesExcluded',
          },
          {
            value: 'postCategoriesExcludedScrollable',
          },
        ]}
        containerClassName={cn('grid gap-2', {
          'grid-cols-2': !showPreview,
          'grid-cols-1': showPreview,
        })}
        {...props}
        label={
          <div className="flex flex-wrap gap-1">
            <span>{label}</span>
            <div
              className="text-indigo-500 cursor-pointer"
              onClick={() => setShowPreview(!showPreview)}
            >{`${showPreview ? '(Ocultar vista previa)' : '(Mostrar vista previa)'}`}</div>
          </div>
        }
      />

      {showPreview && (
        <Skeleton
          searchLayoutType={field.value}
          className="w-full lg:w-8/12 max-w-96 flex-shrink-0"
        />
      )}
    </div>
  );
};
