import { useState } from 'react';

import { Button, ButtonProps } from 'components/button';
import { FieldCheckbox } from 'components/field-checkbox';
import { TablePropsPropcessor } from 'components/table/types';

import { AnyRecord, StyleProps } from 'types/general';
import { removeRow } from 'utils/general';

export interface BulkMeta<RowData extends AnyRecord = AnyRecord> {
  selected: Array<RowData>;
  selectedAll: boolean;
  onReset: () => void;
}

type GetBulkRowNodes<RowData extends AnyRecord = AnyRecord> = (
  args: {
    rowData: RowData;
  },
  nodes: Array<React.ReactNode>
) => Array<React.ReactNode>;

type GetBulkHeaderNodes = (nodes: Array<React.ReactNode>) => Array<React.ReactNode>;

interface BulkActionArgs<RowData extends AnyRecord = AnyRecord> {
  tablePropsProcessor: TablePropsPropcessor<RowData>;
  selectAllNode: React.ReactNode;
  selecting: boolean;
  onReset: () => void;
  getDisabledOverlay: (node: React.ReactNode) => React.ReactNode;
  bulkActionNode: React.ReactNode;
}

export interface BulkActionsProps<
  Action extends string = string,
  RowData extends AnyRecord = AnyRecord
> extends StyleProps {
  renderMenuNode: (args: { setAction: (action: Action) => void }) => React.ReactNode;
  getBulkActionBtnProps: (args: { action: Action }) => Partial<ButtonProps>;
  refMeta: React.MutableRefObject<BulkMeta<RowData>>;
  children: (args: BulkActionArgs<RowData>) => React.ReactNode;
}

export const BulkActions = <E extends string = string, RowData extends AnyRecord = AnyRecord>({
  children,
  renderMenuNode,
  getBulkActionBtnProps,
  refMeta
}: BulkActionsProps<E, RowData>) => {
  const [action, setAction] = useState<E>();
  const [selected, setSelected] = useState<Array<RowData>>([]);
  const [selectedAll, setSelectedAll] = useState<boolean>(false);

  const selecting = action !== undefined;
  const enableAction = selectedAll || selected.length > 0;

  const onReset = () => {
    setSelectedAll(false);
    setSelected([]);
    setAction(undefined);
  };

  refMeta.current = { selected, selectedAll, onReset };

  const bulkActionNode = (
    <div className="flex items-center gap-2">
      {selecting ? (
        <>
          <Button
            variant="outlined"
            label="Cancelar acción"
            onClick={() => {
              onReset();
            }}
            className="ml-2"
          />
          {enableAction && <Button variant="outlined" {...getBulkActionBtnProps({ action })} />}
        </>
      ) : (
        renderMenuNode({ setAction })
      )}
    </div>
  );

  const isEqualRowData = (a: RowData, b: RowData) => a._id === b._id;
  const isSelected = (post: RowData) =>
    !!selected.find((p) => isEqualRowData(post, p)) || selectedAll;
  const getIndex = (post: RowData) => selected.findIndex((p) => isEqualRowData(post, p));

  const selectAllNode = selecting && (
    <FieldCheckbox
      key="checkboxSelectAll"
      label="Seleccionar todos"
      noUseFormik
      value={selectedAll}
      onChange={(e) => {
        setSelected([]);
        setSelectedAll(e.target.checked);
      }}
    />
  );

  const getBulkHeaderNodes: GetBulkHeaderNodes = (nodes) => {
    if (!selecting) return nodes;

    return [null, ...nodes];
  };

  const getBulkRowNodes: GetBulkRowNodes<RowData> = ({ rowData }, nodes) => {
    if (!selecting) return nodes;

    return [
      <FieldCheckbox
        key="checkbox"
        noUseFormik
        value={isSelected(rowData)}
        onChange={(e) => {
          if (e.target.checked) {
            setSelected([...selected, rowData]);
          } else {
            setSelected(removeRow(selected, getIndex(rowData)));
          }
        }}
      />,
      ...nodes.map((node, index) => (
        <div key={index} className="relative">
          {node}
          <div className="absolute inset-0 bg-white opacity-60 rounded-md cursor-not-allowed" />
        </div>
      ))
    ];
  };

  return (
    <>
      {children({
        selectAllNode,
        selecting,
        onReset,
        bulkActionNode,
        tablePropsProcessor: ({ heads, getRowProps }) => ({
          heads: getBulkHeaderNodes(heads),
          getRowProps: (rowData, rowIndex) => {
            const out = getRowProps(rowData, rowIndex);

            return {
              ...out,
              nodes: getBulkRowNodes({ rowData }, out.nodes)
            };
          },
          disabledRemapRowsValidation: selecting
        }),
        getDisabledOverlay: (node) => {
          return (
            <div className="relative">
              {node}
              {selecting && (
                <div className="absolute inset-0 bg-white opacity-60 rounded-md cursor-not-allowed" />
              )}
            </div>
          );
        }
      })}
    </>
  );
};
