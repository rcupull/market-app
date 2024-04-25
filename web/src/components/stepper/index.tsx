import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

import { Divider } from 'components/divider';

import { StyleProps } from 'types/general';
import { cn, isNumber } from 'utils/general';

interface StepperItem extends StyleProps {
  stepContent?: React.ReactNode;
  content: React.ReactNode;
}

export interface StepperProps extends StyleProps {
  items: Array<StepperItem>;
  selected?: number;
  onSelect?: (newSelected: number) => void;
  disabled?: boolean;
}

export const Stepper = ({ items, className, onSelect, selected, disabled }: StepperProps) => {
  const [state, setState] = useState<number>();

  useEffect(() => {
    setState(selected);
  }, [selected]);

  return (
    <Tab.Group
      selectedIndex={state}
      onChange={(newSelected) => {
        setState(newSelected);
        onSelect?.(newSelected);
      }}
    >
      <Tab.List className={cn('flex w-screen justify-between items-center', className)}>
        {items.map(({ className, stepContent }, index) => {
          const currentSelected = isNumber(state) && index <= state;

          return (
            <Tab key={index} as={Fragment}>
              <div
                className={cn('flex items-center focus-visible:outline-none', {
                  'flex-grow': index > 0,
                })}
                onClick={(e) => {
                  if (disabled) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
              >
                {index > 0 && (
                  <Divider
                    className={cn('!my-0 mx-2', {
                      '!border-indigo-600': currentSelected,
                    })}
                  />
                )}

                <div
                  className={cn(
                    'w-fit p-1 rounded-full cursor-pointer flex flex-shrink-0 items-center justify-center bg-gray-50 hover:bg-gray-100 border-2 border-gray-400',
                    {
                      '!border-indigo-600': currentSelected,
                      '!cursor-not-allowed text-gray-400': disabled,
                    },
                    className,
                  )}
                >
                  <span> {stepContent ? stepContent : index + 1}</span>
                </div>
              </div>
            </Tab>
          );
        })}
      </Tab.List>
      <Tab.Panels>
        {items.map(({ content }, index) => {
          return (
            <Tab.Panel className="pt-4" key={index}>
              {content}
            </Tab.Panel>
          );
        })}
      </Tab.Panels>
    </Tab.Group>
  );
};
