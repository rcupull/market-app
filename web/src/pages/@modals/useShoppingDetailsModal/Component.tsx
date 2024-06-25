import { ShoppingButtonStateHistory } from 'pages/@common/shopping-button-state-history';
import { ShoppingDetails } from 'pages/@common/shopping-details';
import { Shopping } from 'types/shopping';

export interface ComponentProps {
  shopping: Shopping;
}

export const Component = ({ shopping }: ComponentProps) => {
  return (
    <ShoppingDetails
      shopping={shopping}
      getActions={({ shopping }) => {
        return <ShoppingButtonStateHistory shopping={shopping} />;
      }}
    />
  );
};

export default Component;
