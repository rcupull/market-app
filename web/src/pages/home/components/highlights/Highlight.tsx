import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface HighlightProps extends StyleProps {
  svg: React.FunctionComponent<StyleProps>;
  label: string;
  description: React.ReactNode;
}

export const Highlight = ({ className, svg: Svg, label, description }: HighlightProps) => {
  return (
    <div className={cn('flex flex-col items-center sm:items-start w-full md:max-w-80', className)}>
      <div className="bg-indigo-500 rounded-md p-1">
        <Svg className="size-9 fill-white rounded-md" />
      </div>

      <div className="text-lg font-semibold mt-4">{label}</div>

      <div className="text-md mt-2 text-center sm:text-start">{description}</div>
    </div>
  );
};
