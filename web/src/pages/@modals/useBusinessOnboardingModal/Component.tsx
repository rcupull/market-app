import { Portal } from 'hooks/usePortal';

import { useBusiness } from 'pages/@hooks/useBusiness';

export interface ComponentProps {
  portal: Portal;
  routeName: string;
}

export const Component = ({ portal, routeName }: ComponentProps) => {
  const {} = useBusiness();

  
  return <>{ routeName }</>;
};
