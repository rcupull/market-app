import { useEffect, useState } from 'react';
// @ts-expect-error ignore
import DateInput from 'react-date-range/dist/components/DateInput';

import { DateTimePicker, DateTimePickerProps } from 'components/date-time-picker';
import { Menu } from 'components/menu';

import { cn } from 'utils/general';
export interface DateTimePickerPreview {
  startDate?: string;
  endDate?: string;
  color?: string;
}

export interface DateTimePickerCollapsableProps extends DateTimePickerProps {}

export const DateTimePickerCollapsable = ({
  ...omittedProps
}: DateTimePickerCollapsableProps): JSX.Element => {
  const {  value, onChange } = omittedProps

  const [state, setState] = useState<Date>();


  useEffect(()=>{
    setState(value)
  },[value])

  const handleChange = (newValue: Date) => {
    setState(newValue)
    onChange?.(newValue)
  }

  return (
    <Menu
      buttonElement={
        <DateInput
          className={cn(
            'block w-fit rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:cursor-not-allowed',
          )}
          dateDisplayFormat="dd/MM/yyyy"
          value={state}
          onChange={handleChange}
          onFocus={() => {}}
          readOnly={false}
        />
      }
      topElement={<DateTimePicker {...omittedProps} value={state} onChange={handleChange}/>}
    />
  );
};
