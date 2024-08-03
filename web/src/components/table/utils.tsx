import { Fragment } from 'react';

import { RemapRowsIndexRecord, RemapRowsIndexValue, TableGetRowProps, TableHeads } from './types';

import { AnyRecord } from 'types/general';
import { cn, isEqual, range } from 'utils/general';

export const getRemapedProps = <RowData extends AnyRecord = AnyRecord>(args: {
  remapIndex: RemapRowsIndexValue;
  getRowProps: TableGetRowProps<RowData>;
  heads: TableHeads;
}): {
  getRowProps: TableGetRowProps<RowData>;
  heads: TableHeads;
} => {
  const { remapIndex, getRowProps, heads } = args;

  if (remapIndex === 'none') {
    return { getRowProps, heads };
  }

  return {
    heads: [],
    getRowProps: (rowData, index) => {
      const { nodes, ...omittedProps } = getRowProps(rowData, index);

      const outNodes = remapIndex.reduce((acc, group, index) => {
        return [
          ...acc,
          <div key={index} className="grid grid-cols-2">
            {group.map((index, i) => {
              const isDark = i % 2 === 0;
              const commonStyle = cn('font-semibold px-4 py-1 rounded-sm', {
                'bg-gray-100': isDark,
              });

              return (
                <Fragment key={i}>
                  <div className={cn('font-semibold flex items-center', commonStyle)}>
                    {heads[index]}
                  </div>
                  <div className={cn(commonStyle)}>{nodes[index]}</div>
                </Fragment>
              );
            })}
          </div>,
        ];
      }, [] as TableHeads);

      return {
        nodes: outNodes,
        ...omittedProps,
      };
    },
  };
};

export const validateRemapIndex = (
  remapIndex: RemapRowsIndexRecord,
  headsCount: number,
): boolean => {
  const validRange = range(headsCount);

  return Object.keys(remapIndex).reduce((acc, key) => {
    const value = remapIndex[key as keyof RemapRowsIndexRecord];

    if (value === 'none' || !value) {
      return acc;
    }

    const fullArray = value.reduce((acc, group) => {
      return [...acc, ...group];
    }, [] as number[]);

    return acc && isEqual(validRange, fullArray.sort());
  }, true);
};
