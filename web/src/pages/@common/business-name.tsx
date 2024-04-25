import { useBusiness } from 'pages/@hooks/useBusiness';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface BusinessNameProps extends StyleProps {}

export const BusinessName = ({ className }: BusinessNameProps) => {
  const { business } = useBusiness();

  return (
    <div
      className={cn(
        'text-gray-300 text-2xl text-nowrap overflow-hidden min-w-20 text-ellipsis',
        className,
      )}
    >
      {business?.name || 'Asere Market'}
    </div>
  );
};
