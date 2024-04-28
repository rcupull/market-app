import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface LabelValuePairProps extends StyleProps {
  label: string;
  value: any;
  variant?: 'primary' | 'error' | 'success' | 'default';
}

export const LabelValuePair = ({
  label,
  value,
  className,
  variant = 'default',
}: LabelValuePairProps) => {
  return (
    <div
      className={cn(className, {
        'text-red-700': variant === 'error',
        'text-green-700': variant === 'success',
        'text-indigo-700': variant === 'primary',
      })}
    >
      <span className="font-bold">{`${label}: `}</span>
      <span>{value}</span>
    </div>
  );
};
