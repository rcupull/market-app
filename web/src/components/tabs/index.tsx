import { Tab } from '@headlessui/react';
import { Fragment } from 'react';

import { Nullable, StyleProps } from 'types/general';
import { cn, compact } from 'utils/general';

interface TabItem<L extends string = string> {
  label: L;
  svg?: React.FunctionComponent<StyleProps>;
  content: React.ReactNode;
}

type ItemRender<L extends string = string> = (args: {
  selected: boolean;
  label: L;
  svg?: React.FunctionComponent<StyleProps>;
  index: number;
}) => React.ReactElement;

export interface TabsProps<L extends string = string> extends StyleProps {
  items: Array<Nullable<TabItem<L>>>;
  itemRenderType?: 'classic' | 'rounded';
  itemRender?: ItemRender<L>;
  selected?: number;
  onSelect?: (newSelected: number) => void;
  contentClassName?: string;
  itemContainerClassName?: (args: { selected: boolean; index: number }) => string;
  disabledStepNavigation?: boolean;
}

const clasicItemRender: ItemRender = ({ selected, label, svg: Svg }) => {
  return (
    <div
      className={cn(
        'w-full text-center p-2 bg-gray-50 rounded-sm hover:bg-gray-100 border-b-2 border-transparent text-nowrap flex items-center gap-2',
        {
          '!border-indigo-600': selected,
        },
      )}
    >
      {Svg && <Svg className="h-6 w-6 text-gray-400" />}
      {label}
    </div>
  );
};

export const Tabs = <L extends string = string>({
  items: itemsProp,
  className,
  onSelect,
  selected,
  itemRender = clasicItemRender,
  itemContainerClassName,
  contentClassName,
  disabledStepNavigation,
}: TabsProps<L>) => {
  const items = compact(itemsProp);

  return (
    <Tab.Group selectedIndex={selected} onChange={onSelect}>
      <Tab.List className={cn('flex gap-1 overflow-auto', className)}>
        {items.map(({ label, svg }, index) => {
          return (
            <Tab key={index} as={Fragment}>
              {({ selected }) => {
                return (
                  <div
                    className={cn(
                      'cursor-pointer focus-visible:outline-none',
                      {
                        'cursor-default': disabledStepNavigation,
                      },
                      itemContainerClassName?.({ selected, index }),
                    )}
                    onClick={(e) => {
                      if (disabledStepNavigation) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {itemRender({ label, selected, index, svg })}
                  </div>
                );
              }}
            </Tab>
          );
        })}
      </Tab.List>
      <Tab.Panels>
        {items.map(({ content }, index) => {
          return (
            <Tab.Panel className={cn('pt-4', contentClassName)} key={index}>
              {content}
            </Tab.Panel>
          );
        })}
      </Tab.Panels>
    </Tab.Group>
  );
};
