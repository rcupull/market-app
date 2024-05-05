import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import SvgBrailleSolid from 'icons/BrailleSolid';
import { AnyRecord, StyleProps } from 'types/general';
import { cn } from 'utils/general';
export interface TableRowProps extends StyleProps {
  nodes: Array<React.ReactNode>;
  onClick?: () => void;
  enabledReorder?: boolean;
}

export const TableRow = ({
  nodes: nodesProp,
  onClick,
  className,
  index,
  enabledReorder,
}: TableRowProps & { index: number }) => {
  let nodes = nodesProp;
  const { attributes, listeners, setNodeRef, transform, transition, isSorting, isDragging } =
    useSortable({
      /**
       * Fixing "First row can not move"(read in the TableBase component)
       */
      id: index + 1,
      transition: {
        duration: 0,
        easing: 'ease',
      },
    });

  if (enabledReorder) {
    nodes = [<SvgBrailleSolid className="w-7 h-7" key="move" />, ...nodes];
  }

  return (
    <tr
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      onClick={onClick}
      className={cn(
        {
          ['cursor-pointer']: !!onClick,
          'hover:bg-indigo-50': isSorting && !isDragging,
          'bg-gray-50': isDragging,
        },
        className,
      )}
    >
      {nodes.map((node, indexCell) => {
        let othersProps: AnyRecord = {};

        if (enabledReorder && indexCell === 0) {
          othersProps = {
            ...othersProps,
            ref: setNodeRef,
            ...listeners,
            ...attributes,
            className: '!cursor-grab !hover:bg-gray-100 !p-0',
            title: 'Arrastre y suelte para reordenar',
          };
        }

        return (
          <td
            key={indexCell}
            {...othersProps}
            className={cn(
              'px-6 py-4 whitespace-no-wrap border-b border-gray-200 relative',
              othersProps.className,
            )}
          >
            {node}
          </td>
        );
      })}
    </tr>
  );
};
