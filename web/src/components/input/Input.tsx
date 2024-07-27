import { forwardRef } from 'react';

import { PasswordWrapper } from './PasswordWrapper';
import { InputProps } from './types';

import { cn, isNumber } from 'utils/general';

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { type } = props;

  const renderInput = (props: InputProps) => {
    const {
      className,
      endElement,
      typeOnlyNumbers,
      preventDefaultEnter,
      typeMaxLength,
      typeByRegex,
      ...omittedProps
    } = props;

    return (
      <div className={cn('relative h-9', className)}>
        <input
          ref={ref}
          className={cn(
            'block w-full h-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:cursor-not-allowed',
            {
              '!pr-10': endElement,
            },
          )}
          {...omittedProps}
          onKeyPress={(event) => {
            /**
             * can not type any character if not match the regex
             */
            if (typeByRegex && !typeByRegex.test(event.key)) {
              event.preventDefault();
            }

            if (typeOnlyNumbers && !/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
            //@ts-expect-error ignore types
            if (isNumber(typeMaxLength) && omittedProps.value?.length > typeMaxLength) {
              event.preventDefault();
            }
            omittedProps.onKeyPress?.(event);
          }}
          onKeyDown={(e) => {
            if (preventDefaultEnter && e.key === 'Enter') {
              e.preventDefault();
            }
            omittedProps.onKeyDown?.(e);
          }}
        />
        {endElement && (
          <div className="absolute h-full top-0 right-0 flex items-center">{endElement}</div>
        )}
      </div>
    );
  };

  if (type === 'password') {
    return (
      <PasswordWrapper>
        {({ endElement, type }) => renderInput({ ...props, endElement, type })}
      </PasswordWrapper>
    );
  }

  if (type === 'number') {
    return renderInput({
      ...props,
      onChange: (e) => {
        props?.onChange?.({
          ...e,
          target: {
            ...e.target,
            //@ts-expect-error ignore this error, it is necessary for now
            value: Number(e.target.value),
          },
        });
      },
    });
  }

  return renderInput(props);
});
