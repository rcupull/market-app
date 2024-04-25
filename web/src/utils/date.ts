const defaultDateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

const defaultTimeOptions: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  hour12: true,
  minute: 'numeric',
};

export const getDateString = ({
  date,
  showTime,
}: {
  date: Date | string;
  showTime?: boolean;
}): string => {
  let dateToshow = date;

  if (typeof dateToshow === 'string') {
    dateToshow = new Date(dateToshow);
  }

  return dateToshow?.toLocaleDateString('en-AU', {
    ...defaultDateOptions,
    ...(showTime ? defaultTimeOptions : {}),
  });
};
