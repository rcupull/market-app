import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';

import SvgAngleRightSolid from 'icons/AngleRightSolid';
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
            <DisclosureButton className="flex w-full items-center border border-gray-200 p-2 rounded-sm">
              {header}

              <SvgAngleRightSolid
                className={cn('w-5 h-5 ml-auto fill-gray-400', {
                  'rotate-90 transform': open
                })}
              />
            </DisclosureButton>
            <DisclosurePanel className="border border-gray-200 p-2 rounded-sm">
              {children}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
