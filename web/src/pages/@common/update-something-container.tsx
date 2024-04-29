import { useState } from 'react';

import { IconButtonUpdate } from 'components/icon-button-update';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface UpdateSomethingContainerProps extends StyleProps {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
}

export const UpdateSomethingContainer = ({
  children,
  onClick,
  title,
  className,
}: UpdateSomethingContainerProps) => {
  const { owner } = useBusiness();
  const [over, setOver] = useState(false);

  if (!owner) {
    return <>{children}</>;
  }

  return (
    <div
      className={cn(
        'relative border-2 border-dashed border-transparent rounded-md max-w-full',
        {
          '!border-gray-400': over,
          '!border-gray-200': !over,
        },
        className,
      )}
    >
      {children}

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
