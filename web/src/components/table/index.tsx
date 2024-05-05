import { useRef } from 'react';

import { SpinnerBox } from 'components/spinner-box';
import { SpinnerEllipsis } from 'components/spinner-ellipsis';

import { useScrollBottom } from 'hooks/useScrollBottom';

import { ReorderContainer } from './reorder-container';
import { TableRow, TableRowProps } from './table-row';

import { AnyRecord, StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface TableProps<RowData extends AnyRecord = AnyRecord> extends StyleProps {
  heads: Array<React.ReactNode>;
  getRowProps: (rowData: RowData, rowIndex: number) => TableRowProps;
  data: Array<RowData> | null;
  isBusy?: boolean;
  //
  onScrollBottom?: () => void;
  isBusyBottom?: boolean;

  onReorder?: (args: { fromIndex: number; toIndex: number }) => void;
  enabledReorder?: boolean;
}

export const Table = <RowData extends AnyRecord = AnyRecord>({
  heads: headsProp,
  getRowProps,
  data,
  className,
  //
  isBusy,
  //
  onScrollBottom,
  isBusyBottom,
  //
  enabledReorder,
  onReorder,
}: TableProps<RowData>) => {
  const ref = useRef<HTMLDivElement>(null);

  const { onScroll } = useScrollBottom(ref, () => onScrollBottom?.());

  let heads = headsProp;
  if (heads && enabledReorder) {
    heads = [null, ...heads];
  }

  return (
    <ReorderContainer onReorder={onReorder}>
      <div ref={ref} onScroll={onScroll} className={cn('relative max-h-screen', className)}>
        <table className="min-w-full overflow-auto max-h-full table-auto">
          <thead className="sticky top-0 z-10">
            <tr>
              {heads.map((head, index) => {
                return (
                  <th
                    key={index}
                    className={cn(
                      'px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50',
                      {
                        '!p-0': enabledReorder && index === 0,
                      },
                    )}
                  >
                    {head}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="bg-white">
            {data?.map((d, index) => {
              const rowProps = getRowProps(d, index);
              return (
                <TableRow key={index} {...rowProps} index={index} enabledReorder={enabledReorder} />
              );
            })}
          </tbody>
        </table>
        {isBusyBottom && (
          <div className="flex justify-center">
            <SpinnerEllipsis />
          </div>
        )}
        {isBusy && <SpinnerBox />}
      </div>
    </ReorderContainer>
  );
};
