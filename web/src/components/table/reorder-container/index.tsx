import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { range } from 'utils/general';

export interface ReorderContainerProps {
  children: React.ReactNode;
  onReorder?: (args: { fromIndex: number; toIndex: number }) => void;
  data?: Array<any> | null;
}

export const ReorderContainer = ({ children, onReorder, data }: ReorderContainerProps) => {
  return (
    <DndContext
      onDragEnd={({ active, over }) => {
        /**
         * Fixing "First row can not move"
         * https://stackoverflow.com/questions/73936273/react-dnd-kit-sortable-why-is-the-first-element-of-my-sortable-not-draggable
         * the id sorteable can not be 0. For that the range of sort id start in one
         */
        const fromIndex = (active.id as number) - 1;
        const toIndex = (over?.id as number) - 1;

        if (fromIndex === toIndex) return;

        onReorder?.({
          fromIndex,
          toIndex,
        });
      }}
    >
      <SortableContext
        items={
          data?.length
            ? range(data.length).map((sortId) => {
                /**
                 * Fixing "First row can not move"(read above)
                 */
                return sortId + 1;
              })
            : []
        }
      >
        {children}
      </SortableContext>
    </DndContext>
  );
};
