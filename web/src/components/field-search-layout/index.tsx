import { useState } from 'react';

import { FieldSelect, FieldSelectProps } from 'components/field-select';

import { useFormikField } from 'hooks/useFormikField';

import { Skeleton } from './skeleton';

import { SearchLayoutType } from 'types/business';
import { getSearchLayoutLabel } from 'utils/business';
import { cn } from 'utils/general';

export interface FieldSearchLayoutProps
  extends Omit<FieldSelectProps, 'items' | 'renderOption' | 'renderValue' | 'optionToValue'> {}

export const FieldSearchLayout = (props: FieldSearchLayoutProps) => {
  const { className, ...omittedProps } = props;
  const { label } = omittedProps;
  const [showPreview, setShowPreview] = useState(false);

  const { field } = useFormikField(props);

  return (
    <div className={cn('flex flex-col lg:flex-row gap-2 items-center lg:items-start', className)}>
      <FieldSelect<{ [k in string]: SearchLayoutType }>
        renderOption={({ tag }) => getSearchLayoutLabel(tag)}
        renderValue={({ tag }) => getSearchLayoutLabel(tag)}
        optionToValue={({ tag }) => tag}
        items={[
          {
            tag: 'none',
          },
          {
            tag: 'left',
          },
          {
            tag: 'center',
          },
          {
            tag: 'right',
          },
          {
            tag: 'postCategories',
          },
          {
            tag: 'postCategoriesScrollable',
          },
          {
            tag: 'postCategoriesExcluded',
          },
          {
            tag: 'postCategoriesExcludedScrollable',
          },
        ]}
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
