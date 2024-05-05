import { cloneElement, forwardRef, isValidElement, ReactElement } from 'react';
import { Ellipsis } from 'react-css-spinners';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

const primaryStyles = 'bg-indigo-600 text-white fill-white hover:bg-indigo-500 hover:bg-indigo-500';
const errorStyles = 'bg-red-600 text-white fill-white  hover:bg-red-500';
const linkStyles =
  'text-indigo-600 fill-indigo-600 hover:text-indigo-500 !shadow-none !m-0 !p-0 h-fit';
const outlinedStyles =
  'bg-transparent text-gray-600 fill-gray-600 ring-2 ring-gray-300 hover:bg-gray-100';
const sublinedStyles =
  'bg-transparent text-gray-900 fill-blue-900 border-b-2 border-blue-600 !rounded-none hover:bg-gray-100';
const transparentStyles =
  'bg-transparent text-gray-900 fill-gray-900  hover:bg-gray-100 !shadow-none border-b-2 border-transparent';

type ButtonSvg = React.FunctionComponent<StyleProps> | React.ReactElement<StyleProps>;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outlined' | 'error' | 'link' | 'sublined' | 'transparent';
  svgPosition?: 'left' | 'right';
  label?: string;
  isBusy?: boolean;
  svg?: ButtonSvg;
  stopPropagation?: boolean;
  preventDefault?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    variant = 'primary',
    label,
    isBusy,
    disabled: disabledProp,
    svg,
    stopPropagation,
    preventDefault,
    onClick,
    svgPosition = 'left',
    ...omittedProps
  } = props;

  const disabled = disabledProp || isBusy;

  const getSvg = (Component: ButtonSvg): ReactElement => {
    const commonClassName = cn('h-5 w-5', {
      ['mr-2']: svgPosition === 'left' && label,
      ['ml-2']: svgPosition === 'right' && label,
    });

    if (isValidElement(Component)) {
      return cloneElement(Component, {
        className: cn(commonClassName, Component.props?.className || ''),
      });
    }

    return <Component className={commonClassName} />;
  };

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
          [sublinedStyles]: variant === 'sublined',
          [transparentStyles]: variant === 'transparent',
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
      {svg && svgPosition === 'left' && getSvg(svg)}
      {label}
      {svg && svgPosition === 'right' && getSvg(svg)}

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
