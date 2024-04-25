import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface AccordionProps extends StyleProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}
export const Accordion = ({ children, header, className }: AccordionProps) => {
  return (
    <div className={className}>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full items-center border border-gray-200 p-2 rounded-sm">
              {header}

              <ChevronRightIcon
                className={cn('w-6 h-6 ml-auto text-gray-400', {
                  'rotate-90 transform': open,
                })}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="border border-gray-200 p-2 rounded-sm">
              {children}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
