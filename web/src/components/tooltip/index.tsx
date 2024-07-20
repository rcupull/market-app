import type { PopoverPanelProps } from '@headlessui/react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface TooltipProps extends StyleProps {
  children: React.ReactNode;
  content: React.ReactNode;
  anchor?: PopoverPanelProps['anchor'];
}

export const Tooltip = ({ children, content, className, anchor = 'top start' }: TooltipProps) => {
  return (
    <Popover className={cn('relative', className)} onClick={(e) => e.preventDefault()}>
      <PopoverButton as="div">{children}</PopoverButton>

      <PopoverPanel
        anchor={anchor}
        className="absolute right-0  rounded-md ring-2 ring-gray-200 focus:outline-none w-fit"
      >
        <div className="p-2 text-wrap bg-gray-200 z-10 relative rounded-md max-w-80">{content}</div>
      </PopoverPanel>
    </Popover>
  );
};
