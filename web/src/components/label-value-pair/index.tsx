import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface LabelValuePairProps extends StyleProps {
  label: React.ReactNode;
  value: React.ReactNode;
  variant?: 'primary' | 'error' | 'success' | 'default';
  layout?: 'kpi' | 'default';
}

export const LabelValuePair = ({
  label,
  value,
  className,
  variant = 'default',
  layout = 'default',
}: LabelValuePairProps) => {
  if (layout === 'kpi') {
    return (
      <div
        className={cn('flex flex-col items-center', className, {
          'text-red-700': variant === 'error',
          'text-green-700': variant === 'success',
          'text-indigo-700': variant === 'primary',
        })}
      >
        <span className="font-bold">{label}</span>
        <span>{value}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(className, {
        'text-red-700': variant === 'error',
        'text-green-700': variant === 'success',
        'text-indigo-700': variant === 'primary',
      })}
    >
      <span className="font-bold">{label}:</span>
      <span>{value}</span>
    </div>
  );
};
