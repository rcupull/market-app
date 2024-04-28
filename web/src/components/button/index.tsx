import { forwardRef } from 'react';
import { Ellipsis } from 'react-css-spinners';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

const primaryStyles =
  'bg-indigo-600 text-white  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';
const errorStyles = 'bg-red-600 text-white  hover:bg-red-500';
const linkStyles = 'text-indigo-600 hover:text-indigo-500 !shadow-none !m-0 !p-0 h-fit';
const outlinedStyles = 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outlined' | 'error' | 'link';
  svgPosition?: 'left' | 'right';
  label?: string;
  isBusy?: boolean;
  svg?: React.FunctionComponent<StyleProps>;
  stopPropagation?: boolean;
  preventDefault?: boolean;
  needPremium?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    variant = 'primary',
    label,
    isBusy,
    disabled: disabledProp,
    svg: Svg,
    stopPropagation,
    preventDefault,
    onClick,
    needPremium,
    svgPosition = 'left',
    ...omittedProps
  } = props;

  const disabled = disabledProp || isBusy || needPremium;

  return (
    <button
      ref={ref}
      className={cn(
        'relative px-3 py-1.5 text-sm shadow-sm font-semibold rounded-md flex items-center justify-center leading-6 whitespace-nowrap',
        {
          [primaryStyles]: variant === 'primary',
          [outlinedStyles]: variant === 'outlined',
          [errorStyles]: variant === 'error',
          [linkStyles]: variant === 'link',
          ['cursor-not-allowed']: disabled,
          ['!bg-indigo-300']: variant === 'primary' && disabled,
          ['!bg-gray-300']: variant === 'outlined' && disabled,
          ['!bg-red-300']: variant === 'error' && disabled,
        },
        className,
      )}
      onClick={(e) => {
        if (disabled) {
          return;
        }
        if (stopPropagation) {
          e.stopPropagation();
        }

        if (preventDefault) {
          e.preventDefault();
        }

        onClick?.(e);
      }}
      {...omittedProps}
    >
      {Svg && svgPosition === 'left' && <Svg className={cn('h-5 w-5', { ['mr-2']: label })} />}
      {label}
      {Svg && svgPosition === 'right' && <Svg className={cn('h-5 w-5', { ['ml-2']: label })} />}
      {isBusy && (
        <Ellipsis
          size={40}
          style={{
            position: 'absolute',
            top: '0px',
            height: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...(variant === 'link' ? { top: '-7px' } : {}),
          }}
          {...(variant === 'link' ? { color: 'gray' } : {})}
        />
      )}
    </button>
  );
});
