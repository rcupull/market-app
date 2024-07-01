import { useEffect, useRef, useState } from 'react';

import { Button } from 'components/button';
import { Input } from 'components/input';
import { SpinnerEllipsis } from 'components/spinner-ellipsis';

import { useDebouncer } from 'hooks/useDebouncer';

import SvgAngleLeftSolid from 'icons/AngleLeftSolid';
import SvgAngleRightSolid from 'icons/AngleRightSolid';
import { StyleProps } from 'types/general';
import { cn, isNumber } from 'utils/general';

export interface AmountProps extends StyleProps {
  value?: number;
  onChange?: (newValue: number) => void;
  isBusy?: boolean;
  error?: boolean;
}

export const Amount = ({ value, onChange, className, isBusy, error }: AmountProps) => {
  const [state, setState] = useState<number>();
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
      onChange?.(newValue);
    }, 500);
  };

  return (
    <div className={cn('relative flex items-center gap-1 w-fit', className)}>
      <Button
        svg={<SvgAngleLeftSolid className="!size-3" />}
        stopPropagation
        onClick={() => {
          if (!isNumber(state)) return;
          if (state <= 0) return;

          handleChange(state - 1);
        }}
        variant="outlined"
        className={cn("!p-1 !ring-1",{
          '!ring-2 ring-red-500': error,
        })}
      />

      <Input
        value={state || 0}
        onChange={(e) => handleChange(Number(e.target.value))}
        onClick={(e) => e.stopPropagation()}
        typeOnlyNumbers
        className={cn('!w-20 !h-6', {
          '!font-bold !text-lg text-indigo-700': refPromise.current,
          'ring-2 ring-red-500  rounded-md': error,
        })}
      />

      <Button
        svg={<SvgAngleRightSolid className="!size-3" />}
        stopPropagation
        onClick={() => {
          if (!isNumber(state)) return;

          handleChange(state + 1);
        }}
        variant="outlined"
        className={cn("!p-1 !ring-1",{
          '!ring-2 ring-red-500': error,
        })}
      />

      {isBusy && (
        <div className="bg-white opacity-50 cursor-not-allowed absolute inset-0 flex items-center justify-center">
          <SpinnerEllipsis />
        </div>
      )}
    </div>
  );
};
