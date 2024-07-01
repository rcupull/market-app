import { useMemo } from 'react';

import { FieldRadioGroup, FieldRadioGroupProps } from 'components/field-radio-group';
import { useFormField } from 'components/formux/useFormField';

import { allColorMeta } from 'constants/posts';
import { PostColor, PostColorValue } from 'types/post';
import { cn } from 'utils/general';

export interface FieldColorSelectProps
  extends Omit<FieldRadioGroupProps, 'items' | 'renderOption' | 'optionToValue'> {
  items?: Array<PostColor>;
}

export const FieldColorSelect = (props: FieldColorSelectProps) => {
  const { items, ...omittedProps } = props;

  const { error } = useFormField(props);
  const itemsMeta = useMemo(() => {
    if (!items?.length) return Object.values(allColorMeta);

    return items?.map((color) => allColorMeta[color]) || [];
  }, [items]);

  return (
    <FieldRadioGroup<PostColorValue>
      items={itemsMeta}
      containerClassName="flex gap-2 flex-wrap"
      renderOption={({ checked, item }) => {
        const { bgColor, selectedRingColor } = item;

        return (
          <div
            className={cn('rounded-full p-0.5', {
              'ring-2 ring-red-500': !!error,
              'ring-2 ring-indigo-600': checked,
            })}
          >
            <div
              className={cn(
                bgColor,
                selectedRingColor,
                'h-8 w-8 rounded-full border border-black border-opacity-10'
              )}
            />
          </div>
        );
      }}
      optionToValue={({ name }) => name}
      {...omittedProps}
    />
  );
};
