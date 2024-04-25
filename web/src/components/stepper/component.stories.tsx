import {
  BuildingLibraryIcon,
  CurrencyBangladeshiIcon,
  MagnifyingGlassCircleIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

import { Stepper } from '.';

export default {
  component: Stepper,
};

const getContentDumy = (index: number) => (
  <div className="flex items-center justify-center h-full w-full">{`content ${index}`}</div>
);

export const Default = (): JSX.Element => {
  return (
    <Stepper
      items={[
        {
          stepContent: 'Name',
          content: getContentDumy(0),
        },
        {
          stepContent: 'Title',
          content: getContentDumy(1),
        },
        {
          stepContent: 'Status',
          content: getContentDumy(2),
        },
        {
          stepContent: 'Role',
          content: getContentDumy(3),
        },
      ]}
    />
  );
};

export const Icons = (): JSX.Element => {
  return (
    <Stepper
      items={[
        {
          stepContent: <MagnifyingGlassCircleIcon className="h-6 w-6" />,
          content: getContentDumy(0),
        },
        {
          stepContent: <CurrencyBangladeshiIcon className="h-6 w-6" />,
          content: getContentDumy(1),
        },
        {
          stepContent: <BuildingLibraryIcon className="h-6 w-6" />,
          content: getContentDumy(2),
        },
        {
          stepContent: <PlusCircleIcon className="h-6 w-6" />,
          content: getContentDumy(3),
        },
      ]}
    />
  );
};

export const Styles = (): JSX.Element => {
  return (
    <Stepper
      items={[
        {
          stepContent: 'Name',
          content: getContentDumy(0),
          className: 'bg-red-300',
        },
        {
          stepContent: 'Title',
          content: getContentDumy(1),
          className: 'text-red-500',
        },
        {
          stepContent: 'Status',
          content: getContentDumy(2),
          className: 'border-red-500',
        },
        {
          stepContent: 'Role',
          content: getContentDumy(3),
          className: 'p-4',
        },
      ]}
    />
  );
};

export const Disabled = (): JSX.Element => {
  return (
    <Stepper
      disabled
      items={[
        {
          stepContent: 'Name',
          content: getContentDumy(0),
        },
        {
          stepContent: 'Title',
          content: getContentDumy(1),
        },
        {
          stepContent: 'Status',
          content: getContentDumy(2),
        },
        {
          stepContent: 'Role',
          content: getContentDumy(3),
        },
      ]}
    />
  );
};

export const ControledComponent = (): JSX.Element => {
  const [selected, setSelected] = useState<number>();
  return (
    <>
      <Stepper
        selected={selected}
        onSelect={setSelected}
        items={[
          {
            stepContent: 'Name',
            content: getContentDumy(0),
          },
          {
            stepContent: 'Title',
            content: getContentDumy(1),
          },
          {
            stepContent: 'Status',
            content: getContentDumy(2),
          },
          {
            stepContent: 'Role',
            content: getContentDumy(3),
          },
        ]}
      />

      <Stepper
        selected={selected}
        onSelect={setSelected}
        items={[
          {
            stepContent: 'Name',
            content: getContentDumy(0),
          },
          {
            stepContent: 'Title',
            content: getContentDumy(1),
          },
          {
            stepContent: 'Status',
            content: getContentDumy(2),
          },
          {
            stepContent: 'Role',
            content: getContentDumy(3),
          },
        ]}
      />
    </>
  );
};
