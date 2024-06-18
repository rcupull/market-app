import { RemapRowsIndexRecord, RemapRowsIndexValue, TableGetRowProps, TableHeads } from './types';

import { AnyRecord } from 'types/general';
import { isEqual, range } from 'utils/general';

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
          <div key={index} className="flex flex-col items-start gap-2">
            {group.map((index) => (
              <div
                key={index}
                className="flex items-center gap-4 w-full odd:bg-gray-100 px-2 py-0.5 rounded-sm"
              >
                <div className="font-bold text-nowrap">{heads[index]}</div>
                <div className="ml-auto">{nodes[index]}</div>
              </div>
            ))}
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
