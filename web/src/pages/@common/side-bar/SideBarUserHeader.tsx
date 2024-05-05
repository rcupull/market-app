import { UserAvatar } from 'components/user-avatar';

import { useAuth } from 'features/api-slices/useAuth';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface SideBarUserHeaderProps extends StyleProps {}

export const SideBarUserHeader = ({ className }: SideBarUserHeaderProps) => {
  const { authData } = useAuth();

  const { name } = authData?.user || {};

  return (
    <div className={cn('flex flex-col items-center mb-2', className)}>
      <UserAvatar className="mt-4" size="medium" />
      <span className="mt-4 text-sm border px-2 py-1 border-gray-400 rounded-2xl">{name}</span>
    </div>
  );
};
