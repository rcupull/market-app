import { Popover } from '@headlessui/react';
import { Float } from '@headlessui-float/react';
import { Fragment, useState } from 'react';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface TooltipProps extends StyleProps {
  children: React.ReactNode;
  content: React.ReactNode;
  openWhenHover?: boolean;
}

export const Tooltip = ({ children, content, className, openWhenHover }: TooltipProps) => {
  const [show, setShow] = useState(false);

  return (
    <Popover className={cn('relative', className)} onClick={(e) => e.preventDefault()}>
      <Float
        className="relative"
        offset={10}
        floatingAs={Fragment}
        portal
        autoPlacement={{
          allowedPlacements: ['top-start', 'bottom-start'],
        }}
        {...(openWhenHover ? { show } : {})}
      >
        <Popover.Button
          as="div"
          {...(openWhenHover
            ? {
                onMouseEnter: () => setShow(true),
                onMouseLeave: () => setShow(false),
              }
            : {})}
        >
          {children}
        </Popover.Button>

        <Popover.Panel className="absolute right-0  rounded-md ring-2 ring-gray-200 focus:outline-none w-fit">
          <Float.Arrow className="absolute bg-gray-200 w-4 h-4 !-bottom-2 left-3 rotate-45 border-2 border-gray-200" />
          <div className="p-2 text-wrap bg-gray-200 z-10 relative rounded-md max-w-80">
            {content}
          </div>
        </Popover.Panel>
      </Float>
    </Popover>
  );
};
