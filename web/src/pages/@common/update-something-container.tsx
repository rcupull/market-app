import { useState } from 'react';

import { IconButtonUpdate } from 'components/icon-button-update';
import { Tooltip } from 'components/tooltip';

import SvgExclamationTriangleSolid from 'icons/ExclamationTriangleSolid';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface UpdateSomethingContainerProps extends StyleProps {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
  warning?: string;
}

export const UpdateSomethingContainer = ({
  children,
  onClick,
  title,
  className,
  warning,
}: UpdateSomethingContainerProps) => {
  const { owner } = useBusiness();
  const [over, setOver] = useState(false);

  if (!owner) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={cn(
        'relative border-2 border-dashed border-transparent rounded-md max-w-full',
        {
          '!border-gray-400': over,
          '!border-gray-200': !over,
          '!border-red-200': warning,
        },
        className
      )}
    >
      {children}

      {warning && (
        <div
          onMouseLeave={() => setOver(false)}
          onMouseEnter={() => setOver(true)}
          className={cn('absolute -top-2 -left-2')}
        >
          <Tooltip content={warning}>
            <SvgExclamationTriangleSolid className="size-6 fill-red-500" />
          </Tooltip>
        </div>
      )}

      <div
        onMouseLeave={() => setOver(false)}
        onMouseEnter={() => setOver(true)}
        className={cn('absolute -top-4 -right-4')}
      >
        <IconButtonUpdate
          title={title}
          onClick={(e) => {
            e.preventDefault();
            onClick?.();
          }}
          className="!bg-transparent"
        />
      </div>
    </div>
  );
};
