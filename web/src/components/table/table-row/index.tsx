import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface TableRowProps extends StyleProps {
  nodes: Array<React.ReactNode>;
  onClick?: () => void;
}

export const TableRow = ({ nodes, onClick, className }: TableRowProps) => {
  return (
    <tr onClick={onClick} className={cn({ ['cursor-pointer']: !!onClick }, className)}>
      {nodes.map((node, index) => {
        return (
          <td key={index} className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            {node}
          </td>
        );
      })}
    </tr>
  );
};
