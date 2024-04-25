import { useState } from 'react';

import { Tabs } from '.';

export default {
  component: Tabs,
};

const getContentDumy = (index: number) => (
  <div className="flex items-center justify-center h-full w-full">{`content ${index}`}</div>
);

export const Default = (): JSX.Element => {
  const [selected, setSelected] = useState(3);
  return (
    <>
      <Tabs
        selected={selected}
        onSelect={setSelected}
        items={[
          {
            label: 'Name',
            content: getContentDumy(0),
          },
          {
            label: 'Title',
            content: getContentDumy(1),
          },
          {
            label: 'Status',
            content: getContentDumy(2),
          },
          {
            label: 'Role',
            content: getContentDumy(3),
          },
        ]}
      />

      <Tabs
        selected={selected}
        onSelect={setSelected}
        items={[
          {
            label: 'Name',
            content: getContentDumy(0),
          },
          {
            label: 'Title',
            content: getContentDumy(1),
          },
          {
            label: 'Status',
            content: getContentDumy(2),
          },
          {
            label: 'Role',
            content: getContentDumy(3),
          },
        ]}
      />
    </>
  );
};
