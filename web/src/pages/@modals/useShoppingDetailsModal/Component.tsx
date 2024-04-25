import { ShoppingDetails } from 'pages/@common/shopping-details';
import { Shopping } from 'types/shopping';

export interface ComponentProps {
  shopping: Shopping;
}

export const Component = ({ shopping }: ComponentProps) => {
  return <ShoppingDetails shopping={shopping} />;
};
