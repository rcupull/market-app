import { useState } from 'react';

import { Button } from 'components/button';
import { Tabs } from 'components/tabs';

import SvgAngleLeftSolid from 'icons/AngleLeftSolid';
import SvgAngleRightSolid from 'icons/AngleRightSolid';
import { cn } from 'utils/general';

export interface StepProps {
  backButton: React.ReactElement;
  nextButton: React.ReactElement;
}
export interface StepperProps {
  items: Array<{ label: string; render: (props: StepProps) => React.ReactNode }>;
}

export const Stepper = ({ items }: StepperProps) => {
  const [selected, setSelected] = useState(0);

  /////////////////////////////////////////////////////////////////////////////////
  const backButton = (
    <Button
      label="Atrás"
      svg={SvgAngleLeftSolid}
      variant="link"
      onClick={() => {
        if (selected > 0) {
          setSelected(selected - 1);
        }
      }}
    />
  );

  const nextButton = (
    <Button
      label="Siguiente"
      svg={SvgAngleRightSolid}
      svgPosition="right"
      variant="link"
      onClick={() => {
        if (selected < items.length - 1) {
          setSelected(selected + 1);
        }
      }}
    />
  );

  return (
    <>
      <Tabs
        className="justify-between"
        contentClassName="w-full mt-8"
        onSelect={setSelected}
        selected={selected}
        itemRender={({ label, selected, index }) => (
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'border-2 border-gray-400 rounded-full w-8 h-8 flex items-center justify-center',
                {
                  'font-semibold !border-indigo-500': selected,
                },
              )}
            >
              {index + 1}
            </div>
            <div
              className={cn('text-center', {
                'font-semibold': selected,
              })}
            >
              {label}
            </div>
          </div>
        )}
        items={items.map(({ label, render }) => {
          return {
            label,
            content: render({
              backButton,
              nextButton,
            }),
          };
        })}
      />
    </>
  );
};
