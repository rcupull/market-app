import SvgSyncSolid from 'icons/SyncSolid';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface IconRefreshProps extends StyleProps {}

export const IconRefresh = ({ className }: IconRefreshProps) => (
  <SvgSyncSolid className={cn('!fill-gray-500', className)} />
);
