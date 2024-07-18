import { StyleProps } from 'types/general';
import { PostClothingSize } from 'types/post';
import { cn } from 'utils/general';

export interface ClothingSizeGroupProps extends StyleProps {
  value?: Array<PostClothingSize>;
}

export const ClothingSizeGroup = ({ className, value }: ClothingSizeGroupProps) => {
  if (!value?.length) return null;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <span className="text-sm font-semibold">Tallas:</span>
      {value.map((postClothingSize, index) => (
        <span key={index} className="text-sm">
          {`${index > 0 ? '/ ' : ''} ${postClothingSize}`}
        </span>
      ))}
    </div>
  );
};
