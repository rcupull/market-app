import { PlusCircleIcon } from '@heroicons/react/24/outline';

import { StyleProps } from 'types/general';
export interface IconAddProps extends StyleProps {}

export const IconAdd = ({ className }: IconAddProps) => <PlusCircleIcon className={className} />;
