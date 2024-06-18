import { Calendar } from 'react-date-range';

import { addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { StyleProps } from 'types/general';

export interface DateTimePickerPreview {
  startDate?: string;
  endDate?: string;
  color?: string;
}

export interface DateTimePickerProps extends StyleProps {
  allowDaysAfterNow?: number;
  allowDaysBeforeNow?: number;
  value?: Date;
  onChange?: (value: Date) => void;
  enablePickTime?: boolean;
  minDate?: string;
  maxDate?: string;
  preview?: DateTimePickerPreview;
  showPreviewDate?: boolean; // show date in timepicker and  input value in blank
  keepTimeZone?: boolean;
  onTransformPickerChange?: (date: Date) => Date;
  defaulthours?: 'start' | 'end';
}

export const DateTimePicker = ({
  value,
  onChange,
  allowDaysBeforeNow,
  allowDaysAfterNow,
  minDate,
  maxDate,
  preview,
  showPreviewDate,
  className,
  defaulthours = 'start',
}: DateTimePickerProps): JSX.Element => {
  const allowMinDate =
    allowDaysBeforeNow === undefined ? undefined : addDays(new Date(), -allowDaysBeforeNow);
  const allowMaxDate =
    allowDaysAfterNow === undefined ? undefined : addDays(new Date(), allowDaysAfterNow);

  const auxMinDate = minDate === undefined ? undefined : new Date(minDate);
  const auxMaxDate = maxDate === undefined ? undefined : new Date(maxDate);

  const realMinDate = allowMinDate || auxMinDate;
  const realMaxDate = allowMaxDate || auxMaxDate;

  return (
    <Calendar
      date={!!value && realMinDate && showPreviewDate ? realMinDate : value}
      locale={es}
      onChange={(newDate) => {
        if (value) {
          /**
           * keep hours from value
           */
          const hours = value.getHours();
          onChange?.(new Date(newDate.setHours(hours)));
        } else {
          /**
           * set hours to default if value is undefined
           */
          const setHoursArgs: [number, number, number] =
            defaulthours === 'start' ? [0, 0, 0] : [23, 59, 59];

          onChange?.(new Date(newDate.setHours(...setHoursArgs)));
        }
      }}
      minDate={realMinDate}
      maxDate={realMaxDate}
      preview={
        preview && {
          startDate: preview?.startDate === undefined ? undefined : new Date(preview?.startDate),
          endDate: preview?.endDate === undefined ? undefined : new Date(preview?.endDate),
          color: preview?.color,
        }
      }
      className={className}
    />
  );
};
