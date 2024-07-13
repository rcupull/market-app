import type { MenuItemsProps} from '@headlessui/react';
import { Menu as MenuBase, MenuButton, MenuItem, MenuItems,Transition } from '@headlessui/react';
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
  anchor?: MenuItemsProps['anchor'];
}

export const Menu = ({
  className,
  buttonElement,
  items = [],
  topElement,
  bottomElement,
  anchor = 'bottom start',
}: MenuProps) => {
  return (
    <MenuBase data-id="Menu" as="div" className={cn('relative', className)}>
        <MenuButton as="div" className="cursor-pointer w-fit">
          {buttonElement}
        </MenuButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems anchor={anchor}  className="absolute right-0 z-10 mt-2 w-max origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <MenuItem key="header" as="div">
              {topElement}
            </MenuItem>

            {compact(items).map(
              ({ label, onClick, svg: Svg, divider, className, active, disabled }, index) => (
                <MenuItem key={label}>
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
                            },
                          )}
                        >
                          {Svg && <Svg className={cn('h-5 w-5', { ['mr-2']: label })} />}

                          {label}
                        </div>
                        {divider && <Divider className="!my-2" />}
                      </div>
                    );
                  }}
                </MenuItem>
              ),
            )}

            <MenuItem key="bottomElement" as="div">
              {bottomElement}
            </MenuItem>
          </MenuItems>
        </Transition>
    </MenuBase>
  );
};
