import { Button } from 'components/button';

import { useAuth } from 'features/api-slices/useAuth';

import { useRouter } from 'hooks/useRouter';

import { StyleProps } from 'types/general';
import { cn, compact } from 'utils/general';

interface Item {
  label: React.ReactNode;
  svg?: React.FunctionComponent<StyleProps>;
  onClick?: () => void;
  divider?: boolean | string;
  active?: boolean;
  disabled?: boolean;
}

export interface FooterProps extends StyleProps {}

export const Footer = ({ className }: FooterProps) => {
  const { user, getIsPaymentClient, isAuthenticated } = useAuth();
  const { pushRoute } = useRouter();

  const getItems = (): Array<Item> => {
    const out: Array<Item> = [
      {
        label: 'Generales',
        onClick: () => pushRoute('/general')
      }
    ];

    return out;
  };

  return (
    <footer className={cn('shadow-lg -scale-y-100 bg-white px-2 py-1', className)}>
      <div
        className={cn('flex -scale-y-100  gap-3 overflow-x-auto h-[4.3rem]', {
          'items-start justify-start': isAuthenticated,
          'items-center justify-between': !isAuthenticated
        })}
      >
        {getIsPaymentClient(user) && (
          <>
            {compact(getItems()).map(({ label, onClick }, index) => {
              return <Button key={index} label={label} onClick={onClick} variant="transparent" />;
            })}
          </>
        )}
      </div>
    </footer>
  );
};
