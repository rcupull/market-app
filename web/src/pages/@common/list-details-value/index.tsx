import { cn } from 'utils/general';

export interface ListDetailsValueProps {
  value: React.ReactNode;
  error?: boolean;
}
export const ListDetailsValue = ({ value, error }: ListDetailsValueProps) => {
  return (
    <div
      className={cn('font-semibold', {
        'text-red-500': error,
      })}
    >
      {value}
    </div>
  );
};
