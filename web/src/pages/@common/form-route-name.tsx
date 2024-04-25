import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface FormRouteNameProps extends StyleProps {
  routeName: string;
  error: boolean;
}

export const FormRouteName = ({ routeName, error, className }: FormRouteNameProps) => {
  const iconToRender = error ? (
    <XCircleIcon className="text-red-500 w-5 h-5" />
  ) : (
    <CheckCircleIcon className="text-green-500 w-5 h-5" />
  );

  return (
    <div className={className}>
      {routeName && (
        <div className="flex items-center">
          {iconToRender}

          <span className="text-sm ml-1">Ruta de la página:</span>
          <span
            className={cn('text-sm ml-1', {
              'text-red-500': error,
              'text-green-500': !error,
            })}
          >
            {routeName}
          </span>
        </div>
      )}
    </div>
  );
};
