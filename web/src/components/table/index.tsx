import { useRef } from 'react';

import { SpinnerBox } from 'components/spinner-box';
import { SpinnerEllipsis } from 'components/spinner-ellipsis';

import { useBreakpoints } from 'hooks/useBreakpoints';
import { useScrollBottom } from 'hooks/useScrollBottom';

import { ReorderContainer } from './reorder-container';
import { TableRow } from './table-row';
import { RemapRowsIndexValue, TableProps } from './types';
import { getRemapedProps, validateRemapIndex } from './utils';

import { AnyRecord } from 'types/general';
import { cn } from 'utils/general';

export const Table = <RowData extends AnyRecord = AnyRecord>(props: TableProps<RowData>) => {
  const { propsPreprocessors, ...initialProps } = props;

  const {
    heads: headsProp,
    getRowProps: getRowPropsProp,
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
    remapRowsIndex,
    disabledRemapRowsValidation,
  } = (propsPreprocessors || []).reduce(
    (acc, propsPreprocessor) => ({ ...acc, ...propsPreprocessor(acc) }),
    initialProps,
  );

  const ref = useRef<HTMLDivElement>(null);

  const { onScroll } = useScrollBottom(ref, () => onScrollBottom?.());

  let heads = headsProp;
  let getRowProps = getRowPropsProp;

  const breakpoints = useBreakpoints();

  if (remapRowsIndex) {
    if (!disabledRemapRowsValidation && !validateRemapIndex(remapRowsIndex, heads.length)) {
      throw new Error('Invalid remapRowsIndex');
    }

    const handleRemap = (remapIndex: RemapRowsIndexValue | undefined): void => {
      if (!remapIndex) {
        return;
      }

      const remapedProps = getRemapedProps<RowData>({
        remapIndex,
        heads,
        getRowProps,
      });

      getRowProps = remapedProps.getRowProps;
      heads = remapedProps.heads;
    };

    let arg = remapRowsIndex.xs;
    if (breakpoints.xs) handleRemap(arg);
    arg = remapRowsIndex.sm ? remapRowsIndex.sm : arg;
    if (breakpoints.sm) handleRemap(arg);
    arg = remapRowsIndex.md ? remapRowsIndex.md : arg;
    if (breakpoints.md) handleRemap(arg);
    arg = remapRowsIndex.lg ? remapRowsIndex.lg : arg;
    if (breakpoints.lg) handleRemap(arg);
    arg = remapRowsIndex.xl ? remapRowsIndex.xl : arg;
    if (breakpoints.xl) handleRemap(arg);
    arg = remapRowsIndex.xxl ? remapRowsIndex.xxl : arg;
    if (breakpoints.xxl) handleRemap(arg);
  }

  if (heads && enabledReorder) {
    heads = [null, ...heads];
  }

  const renderUnderTable = () => {
    if (isBusyBottom) {
      return (
        <div className="flex justify-center">
          <SpinnerEllipsis />
        </div>
      );
    }

    if (isBusy) {
      return <SpinnerBox />;
    }

    if (data && !data?.length) {
      return (
        <div className="flex items-center justify-center h-48 text-xl text-gray-500">
          No hay elementos que mostrar
        </div>
      );
    }

    return null;
  };
  return (
    <ReorderContainer onReorder={onReorder}>
      <div
        ref={ref}
        onScroll={onScroll}
        className={cn('relative max-h-screen overflow-auto', className)}
      >
        <table className="min-w-full max-h-full table-auto">
          <thead className="sticky top-0">
            <tr>
              {heads.map((head, index) => {
                return (
                  <th
                    key={index}
                    className={cn(
                      'px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b-2 border-gray-200 bg-gray-50',
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
        {renderUnderTable()}
      </div>
    </ReorderContainer>
  );
};
