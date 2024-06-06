import { Button } from 'components/button';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface SettingBoxProps extends StyleProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  onClick?: () => void;
  svg: React.FunctionComponent<StyleProps>;
}

export const SettingBox = ({
  title,
  className,
  onClick,
  description,
  svg: Svg,
}: SettingBoxProps): JSX.Element => {
  return (
    <div
      className={cn(
        'w-64 h-72 gap-1 p-2 border border-gray-300 rounded-md flex flex-col',
        className,
      )}
    >
      <div className="flex items-center justify-center ">
        <Svg className="h-32 w-24 fill-gray-400 text-gray-400" />
      </div>
      <h2 className="font-bold">{title}</h2>
      <span className="text-sm">{description}</span>
      <div className="mt-auto flex items-center justify-end">
        <Button variant="link" onClick={onClick} label="Editar" />
      </div>
    </div>
  );
};
