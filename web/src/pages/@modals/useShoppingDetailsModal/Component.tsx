import { ShoppingButtonStateHistory } from 'pages/@common/shopping-button-state-history';
import { ShoppingDetails } from 'pages/@common/shopping-details';
import { ShoppingStateBadge } from 'pages/@common/shopping-state-badge';
import { Shopping } from 'types/shopping';

export interface ComponentProps {
  shopping: Shopping;
}

export const Component = ({ shopping }: ComponentProps) => {
  return (
    <ShoppingDetails
      shopping={shopping}
      getActions={({ shopping }) => {
        return (
          <>
            <ShoppingStateBadge shopping={shopping} />
            <ShoppingButtonStateHistory shopping={shopping} />
          </>
        );
      }}
    />
  );
};

export default Component;
