import { TableRowProps } from './table-row';

import { AnyRecord, StyleProps } from 'types/general';

export type TableGetRowProps<RowData> = (rowData: RowData, rowIndex: number) => TableRowProps;

export type TableHeads = Array<React.ReactNode>;

export type RemapRowsIndexValue = Array<Array<number>> | 'none';
export interface RemapRowsIndexRecord {
  xs?: RemapRowsIndexValue;
  sm?: RemapRowsIndexValue;
  md?: RemapRowsIndexValue;
  lg?: RemapRowsIndexValue;
  xl?: RemapRowsIndexValue;
  xxl?: RemapRowsIndexValue;
}

export interface TableProps<RowData extends AnyRecord = AnyRecord> extends StyleProps {
  remapRowsIndex?: RemapRowsIndexRecord;
  heads: TableHeads;
  getRowProps: TableGetRowProps<RowData>;
  data: Array<RowData> | null;
  isBusy?: boolean;
  //
  onScrollBottom?: () => void;
  isBusyBottom?: boolean;

  onReorder?: (args: { fromIndex: number; toIndex: number }) => void;
  enabledReorder?: boolean;
}
