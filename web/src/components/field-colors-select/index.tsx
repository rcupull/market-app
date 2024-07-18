import { useMemo } from 'react';

import { ColorCircle } from 'components/color-circle';
import { FieldRadioGroup, FieldRadioGroupProps } from 'components/field-radio-group';
import { useFormField } from 'components/formux/useFormField';

import { allColorMeta } from 'constants/posts';
import { PostColor } from 'types/post';

export interface FieldColorSelectProps
  extends Omit<FieldRadioGroupProps, 'items' | 'renderOption' | 'optionToValue'> {
  items?: Array<PostColor>;
}

export const FieldColorSelect = (props: FieldColorSelectProps) => {
  const { items: itemsProp, ...omittedProps } = props;

  const { error } = useFormField(props);

  const items = useMemo<Array<PostColor>>(() => {
    return itemsProp?.length ? itemsProp : (Object.keys(allColorMeta) as Array<PostColor>);
  }, [itemsProp]);

  return (
    <FieldRadioGroup<PostColor>
      items={items}
      containerClassName="flex gap-2 flex-wrap"
      renderOption={({ checked, item }) => {
        return <ColorCircle postColor={item} checked={checked} error={!!error} />;
      }}
      optionToValue={(postColor) => allColorMeta[postColor].name}
      {...omittedProps}
    />
  );
};
