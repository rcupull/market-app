import { RadioGroup } from '@headlessui/react';
import { useEffect, useMemo, useState } from 'react';

import { FormFieldWrapper, FormFieldWrapperProps } from 'components/form-field-wrapper';

import { FormikFieldProps, useFormikField } from 'hooks/useFormikField';

import { allColorMeta } from 'constants/posts';
import { PostColor } from 'types/post';
import { addRow, cn, isNumber, removeRow } from 'utils/general';

type Value = PostColor | Array<PostColor>;

export interface FieldColorSelectProps<V extends Value = Value>
  extends FormFieldWrapperProps,
    FormikFieldProps<V> {
  items?: Array<PostColor>;
  multi?: boolean;
}

export const FieldColorSelect = <V extends Value = Value>(props: FieldColorSelectProps<V>) => {
  const [state, setState] = useState<V>();

  const { label, className, items, multi } = props;
  const { field, error } = useFormikField<V>(props);
  const { value } = field;

  useEffect(() => {
    setState(value);
  }, [value]);

  const handleClick = (color: PostColor) => {
    if (multi) {
      let newState = (state ? state : []) as Array<PostColor>;

      const index = newState.findIndex((c) => c === color);

      if (isNumber(index) && index >= 0) {
        //remove color
        newState = removeRow(newState, index);
      } else {
        //add color
        newState = addRow(newState, color);
      }

      setState(newState as V);
      field.onChange({
        target: {
          name: field.name,
          value: newState,
        },
      });
    } else {
      setState(color as V);
      field.onChange({
        target: {
          name: field.name,
          value: color,
        },
      });
    }
  };

  const itemsMeta = useMemo(() => {
    if (!items?.length) return Object.values(allColorMeta);

    return items?.map((color) => allColorMeta[color]) || [];
  }, [items]);

  return (
    <FormFieldWrapper label={label} error={error} className={className}>
      <RadioGroup
        onBlur={(e) => {
          //@ts-expect-error ignore
          e.target.name = field.name; // had code the blur event to detect touch in formik
          field.onBlur(e);
        }}
      >
        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
        <div className="flex items-center space-x-3">
          {itemsMeta.map((colorMeta) => {
            const active = multi
              ? (state as Array<PostColor>)?.find((c) => c === colorMeta.name)
              : state === colorMeta.name;

            return (
              <RadioGroup.Option
                key={colorMeta.name}
                value={colorMeta}
                onClick={() => handleClick(colorMeta.name)}
                className={cn(
                  colorMeta.selectedRingColor,
                  {
                    'ring-2 ring-indigo-600': active,
                    'ring-2 ring-red-500': !!error,
                  },
                  'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
                )}
              >
                <RadioGroup.Label as="span" className="sr-only">
                  {colorMeta.name}
                </RadioGroup.Label>
                <span
                  aria-hidden="true"
                  className={cn(
                    colorMeta.bgColor,
                    'h-8 w-8 rounded-full border border-black border-opacity-10',
                  )}
                />
              </RadioGroup.Option>
            );
          })}
        </div>
      </RadioGroup>
    </FormFieldWrapper>
  );
};
