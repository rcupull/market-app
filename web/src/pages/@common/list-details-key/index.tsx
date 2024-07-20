import { cn } from 'utils/general';

export interface ListDetailsKeyProps {
  label: React.ReactNode;
  error?: boolean;
}
export const ListDetailsKey = ({ label, error }: ListDetailsKeyProps) => {
  return (
    <div
      className={cn('font-bold text-xs text-gray-400', {
        'text-red-500': error,
      })}
    >
      {label}
    </div>
  );
};
