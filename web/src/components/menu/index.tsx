import { Menu as MenuBase, Transition } from '@headlessui/react';
import { Float } from '@headlessui-float/react';
import { Fragment } from 'react';

import { Divider } from 'components/divider';

import { Nullable, StyleProps } from 'types/general';
import { cn, compact } from 'utils/general';

interface MenuItem extends StyleProps {
  label: string;
  svg?: React.FunctionComponent<StyleProps>;
  onClick?: () => void;
  divider?: boolean;
  active?: boolean;
  disabled?: boolean;
}

export interface MenuProps extends StyleProps {
  items?: Array<Nullable<MenuItem>>;
  buttonElement: React.ReactNode;
  topElement?: React.ReactNode;
  bottomElement?: React.ReactNode;
}

export const Menu = ({
  className,
  buttonElement,
  items = [],
  topElement,
  bottomElement,
}: MenuProps) => {
  return (
    <MenuBase data-id="Menu" as="div" className={cn('relative', className)}>
      <Float
        as="div"
        className="relative"
        offset={4}
        floatingAs={Fragment}
        portal
        autoPlacement={{
          allowedPlacements: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
        }}
      >
        <MenuBase.Button as="div" className="cursor-pointer w-fit">
          {buttonElement}
        </MenuBase.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuBase.Items className="absolute right-0 z-10 mt-2 w-max origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <MenuBase.Item key="header" as="div">
              {topElement}
            </MenuBase.Item>

            {compact(items).map(
              ({ label, onClick, svg: Svg, divider, className, active, disabled }, index) => (
                <MenuBase.Item key={label}>
                  {() => {
                    return (
                      <div key={index} className={className}>
                        <div
                          onClick={() => {
                            if (disabled) return;
                            onClick?.();
                          }}
                          className={cn(
                            'cursor-pointer px-4 py-2 text-sm text-gray-700 flex items-center',
                            {
                              'bg-gray-100': active,
                              '!cursor-not-allowed !text-gray-300': disabled,
                            }
                          )}
                        >
                          {Svg && <Svg className={cn('h-5 w-5', { ['mr-2']: label })} />}

                          {label}
                        </div>
                        {divider && <Divider className="!my-2" />}
                      </div>
                    );
                  }}
                </MenuBase.Item>
              )
            )}

            <MenuBase.Item key="bottomElement" as="div">
              {bottomElement}
            </MenuBase.Item>
          </MenuBase.Items>
        </Transition>
      </Float>
    </MenuBase>
  );
};
