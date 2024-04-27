import { RadioGroup as RadioGroupBase } from '@headlessui/react';

import { SpinnerEllipsis } from 'components/spinner-ellipsis';

import { MultiContainer } from './MultiContainer';

import { StyleProps } from 'types/general';
import { cn, getFlattenJson } from 'utils/general';

export interface RadioGroupProps<O, V = any> extends StyleProps {
  items: Array<O>;
  value?: V;
  onChange?: (newValue: V) => void;
  renderOption: (args: { checked: boolean; item: O; index: number }) => React.ReactElement;
  optionToValue: (item: O) => V;
  disabledOption?: (args: { item: O; index: number }) => boolean;
  onBlur?: () => void;
  onOptionClicked?: (item: O, options: { selected: boolean }) => void;
  getOptionCutomStyles?: (item: O, options: { selected: boolean }) => string;
  isBusy?: boolean;
  multi?: boolean;
}

//eslint-disable-next-line
export const RadioGroup = <O extends any = any>({
  className,
  items,
  value,
  onChange,
  onBlur,
  renderOption,
  optionToValue,
  isBusy,
  multi,
  disabledOption,
  onOptionClicked,
  getOptionCutomStyles,
}: RadioGroupProps<O>) => {
  if (multi) {
    return (
      <MultiContainer items={items} optionToValue={optionToValue} value={value}>
        {({ selected, setSelected }) => (
          <div className={className}>
            {items.map((item, index) => {
              const checked = !!selected[index];
              return (
                <div
                  key={index}
                  onBlur={onBlur}
                  onClick={() => {
                    const newSelected = { ...selected, [index]: checked ? undefined : true };
                    setSelected(newSelected);

                    const newValue = Object.keys(getFlattenJson(newSelected)).map((index) => {
                      return optionToValue(items[Number(index)]);
                    });

                    onChange?.(newValue);
                    onOptionClicked?.(item, { selected: !checked });
                  }}
                  className={cn(
                    'relative',
                    getOptionCutomStyles?.(item, { selected: !checked }) ?? '',
                  )}
                >
                  {renderOption({ checked, item, index })}

                  {!!disabledOption?.({ item, index }) && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute inset-0 bg-white opacity-55 flex items-center justify-center cursor-not-allowed"
                    />
                  )}
                </div>
              );
            })}
            {isBusy && (
              <div className="absolute inset-0 bg-white opacity-55 flex items-center justify-center">
                <SpinnerEllipsis />
              </div>
            )}
          </div>
        )}
      </MultiContainer>
    );
  }

  /**
   * When the value is an object the RadioGroupBase no change correctly and it needs to be converted to a basic data type, string in this case
   */
  const getComparableValue = (value: any) => JSON.stringify({ value });
  const getComparableonChange = (onChange: RadioGroupProps<O>['onChange']) => (val: string) => {
    onChange?.(JSON.parse(val).value);
  };

  return (
    <RadioGroupBase
      onBlur={onBlur}
      value={getComparableValue(value)}
      onChange={getComparableonChange(onChange)}
      className={cn('relative', className)}
    >
      {items.map((item, index) => {
        const value = optionToValue(item);
        const disabled = disabledOption?.({ item, index }) ?? false;

        return (
          <RadioGroupBase.Option key={index} value={getComparableValue(value)} disabled={disabled}>
            {({ checked }) => (
              <div className="relative">
                {renderOption({ checked, item, index })}

                {!!disabledOption?.({ item, index }) && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute inset-0 bg-white opacity-55 flex items-center justify-center cursor-not-allowed"
                  />
                )}
              </div>
            )}
          </RadioGroupBase.Option>
        );
      })}
      {isBusy && (
        <div className="absolute inset-0 bg-white opacity-55 flex items-center justify-center">
          <SpinnerEllipsis />
        </div>
      )}
    </RadioGroupBase>
  );
};
