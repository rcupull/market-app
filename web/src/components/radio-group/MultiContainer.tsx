import { useEffect, useState } from 'react';

import { isArray, isEqualObj, isNumber, isString } from 'utils/general';

type State = Record<number, undefined | boolean>;

export interface MultiContainerProps<O, V = any> {
  children: (args: { selected: State; setSelected: (state: State) => void }) => React.ReactNode;
  value?: V;
  items: Array<O>;
  optionToValue: (item: O) => V;
}
//eslint-disable-next-line
export const MultiContainer = <O extends any = any>({
  children,
  value,
  items,
  optionToValue,
}: MultiContainerProps<O>) => {
  const [selected, setSelected] = useState<State>({});

  useEffect(() => {
    if (isArray(value)) {
      setSelected(
        items.reduce((acc, item, index) => {
          const valueOption = optionToValue(item);

          const exist = value.find((v) => {
            if ((isString(valueOption) && isString(v)) || (isNumber(valueOption) && isNumber(v))) {
              return valueOption === v;
            }

            return isEqualObj(valueOption, v);
          });

          return {
            ...acc,
            [index]: exist,
          };
        }, {}),
      );
    }
  }, [JSON.stringify(value)]);

  return <>{children({ selected, setSelected })}</>;
};
