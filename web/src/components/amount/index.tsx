import { useEffect, useRef, useState } from 'react';

import { Button } from 'components/button';
import { Input } from 'components/input';
import { SpinnerEllipsis } from 'components/spinner-ellipsis';

import { useDebouncer } from 'hooks/useDebouncer';

import SvgAngleLeftSolid from 'icons/AngleLeftSolid';
import SvgAngleRightSolid from 'icons/AngleRightSolid';
import { StyleProps } from 'types/general';
import { cn, isNullOrUndefined, isNumber } from 'utils/general';

export interface AmountProps extends StyleProps {
  value?: number;
  onChange?: (newValue: number) => void;
  isBusy?: boolean;
  error?: boolean;
  min?: number;
  max?: number;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export const Amount = ({
  value,
  onChange,
  className,
  isBusy,
  error,
  min,
  max,
  size = 'small',
  disabled
}: AmountProps) => {
  const [state, setState] = useState<number>();
  const [bottomMessage, setBottomMessage] = useState<string>();
  const refPromise = useRef(false);

  useEffect(() => {
    setState(value);
  }, [value]);

  const debouncer = useDebouncer();

  const handleChange = (newValue: number) => {
    setState(newValue);
    refPromise.current = true;
    debouncer(() => {
      refPromise.current = false;
      setState(value);

      if (!isNullOrUndefined(min) && newValue < min) {
        setBottomMessage(`El mínimo es ${min}`);
        setTimeout(() => setBottomMessage(undefined), 5000);
        return;
      }
      if (!isNullOrUndefined(max) && newValue > max) {
        setBottomMessage(`El máximo es ${max}`);
        setTimeout(() => setBottomMessage(undefined), 5000);
        return;
      }

      onChange?.(newValue);
    }, 1000);
  };

  const getDisabledByMin = (): boolean => {
    if (isNullOrUndefined(min)) return false;
    if (isNullOrUndefined(state)) return false;

    return state <= min;
  };

  const getDisabledByMax = (): boolean => {
    if (isNullOrUndefined(max)) return false;
    if (isNullOrUndefined(state)) return false;

    return state >= max;
  };

  return (
    <div className={cn('w-fit', className)}>
      <div className={cn('relative flex items-center gap-1 w-fit')}>
        <Button
          svg={
            <SvgAngleLeftSolid
              className={cn({
                '!size-3': size === 'small',
                '!size-4': size === 'medium',
                '!size-6': size === 'large'
              })}
            />
          }
          stopPropagation
          preventDefault
          disabled={getDisabledByMin() || disabled}
          onClick={() => {
            if (!isNumber(state)) return;
            if (state <= 0) return;

            handleChange(state - 1);
          }}
          variant="outlined"
          className={cn('!p-1 !ring-1', {
            '!ring-2 ring-red-500': error
          })}
        />

        <Input
          value={isNullOrUndefined(state) ? '' : state}
          onChange={(e) => handleChange(Number(e.target.value))}
          onClick={(e) => e.stopPropagation()}
          disabled={disabled}
          typeOnlyNumbers
          className={cn('!w-20', {
            '!font-bold !text-lg text-indigo-700': refPromise.current,
            'ring-2 ring-red-500  rounded-md': error,
            '!h-6': size === 'small',
            '!h-7': size === 'medium',
            '!h-9': size === 'large'
          })}
        />

        <Button
          svg={
            <SvgAngleRightSolid
              className={cn({
                '!size-3': size === 'small',
                '!size-4': size === 'medium',
                '!size-6': size === 'large'
              })}
            />
          }
          stopPropagation
          preventDefault
          onClick={() => {
            if (!isNumber(state)) return;

            handleChange(state + 1);
          }}
          disabled={getDisabledByMax() || disabled}
          variant="outlined"
          className={cn('!p-1 !ring-1', {
            '!ring-2 ring-red-500': error
          })}
        />

        {isBusy && (
          <div className="bg-white opacity-50 cursor-not-allowed absolute inset-0 flex items-center justify-center">
            <SpinnerEllipsis />
          </div>
        )}
      </div>

      {bottomMessage && <div className="text-xs text-red-500">{bottomMessage}</div>}
    </div>
  );
};
