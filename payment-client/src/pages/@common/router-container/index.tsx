import { useRouter, UseRouterReturn } from 'hooks/useRouter';
export interface RouterContainerProps {
  children?: (args: UseRouterReturn) => React.ReactNode;
}

export const RouterContainer = ({ children }: RouterContainerProps) => {
  const router = useRouter();
  return children?.(router);
};
