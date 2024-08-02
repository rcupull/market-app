import { useState } from 'react';

import { ButtonProps } from 'components/button';
import { Tabs, TabsProps } from 'components/tabs';

import { Nullable } from 'types/general';
import { cn, compact } from 'utils/general';

export interface StepperBtnProps
  extends Pick<ButtonProps, 'svg' | 'svgPosition' | 'label' | 'className' | 'variant' | 'isBusy'> {
  onClick?: () => void;
}

export interface StepProps {
  nextBtnProps: StepperBtnProps;
  centerBtnProps: StepperBtnProps;
  backBtnProps: StepperBtnProps;
}
export interface StepperProps extends Pick<TabsProps, 'disabledStepNavigation'> {
  items: Array<Nullable<{ label: string; render: (props: StepProps) => React.ReactNode }>>;
}

export const Stepper = ({ items, disabledStepNavigation = true }: StepperProps) => {
  const [selected, setSelected] = useState(0);

  /////////////////////////////////////////////////////////////////////////////////

  const nextBtnProps: StepProps['nextBtnProps'] = {
    label: 'Siguiente',
    className: '!rounded-3xl !py-0.5',
    onClick: () => {
      if (selected < items.length - 1) {
        setSelected(selected + 1);
      }
    },
  };

  const backBtnProps: StepProps['backBtnProps'] = {
    label: 'Atrás',
    variant: 'outlined',
    className: '!rounded-3xl !py-0.5',
    onClick: () => {
      if (selected > 0) {
        setSelected(selected - 1);
      }
    },
  };

  const centerBtnProps: StepProps['centerBtnProps'] = {
    label: 'Omitir',
    variant: 'outlined',
    className: '!rounded-3xl !py-0.5',
    onClick: nextBtnProps.onClick,
  };

  return (
    <>
      <Tabs
        disabledStepNavigation={disabledStepNavigation}
        itemContainerClassName={({ selected }) =>
          cn({
            'flex-grow flex justify-start': selected,
          })
        }
        tabPanelClassName={cn('w-full mt-8')}
        onSelect={setSelected}
        selected={selected}
        itemRender={({ label, selected, index }) => (
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'border-2 border-gray-400 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0',
                {
                  'font-semibold !border-indigo-500 !bg-indigo-500 !text-white': selected,
                }
              )}
            >
              {index + 1}
            </div>
            {selected && <div className={cn('text-center font-semibold')}>{label}</div>}
          </div>
        )}
        tabListClassName="flex items-center"
        items={compact(items).map(({ label, render }) => {
          return {
            label,
            content: render({
              nextBtnProps,
              backBtnProps,
              centerBtnProps,
            }),
          };
        })}
      />
    </>
  );
};
