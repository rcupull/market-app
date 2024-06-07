import { Button } from 'components/button';
import { LabelValuePair } from 'components/label-value-pair';

import SvgCheckCircleSolid from 'icons/CheckCircleSolid';
import SvgTimesCircleSolid from 'icons/TimesCircleSolid';
import { useBusiness } from 'pages/@hooks/useBusiness';
import { useBusinessUpdateShopping } from 'pages/@modals/useBusinessUpdateShopping';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export const KpiTotalDebit = ({ className }: StyleProps) => {
  const { business } = useBusiness();

  if (!business) {
    return <></>;
  }
  const { shoppingPayment } = business || {};

  return (
    <LabelValuePair
      label={<span className="text-nowrap">Débito</span>}
      value={<span className="text-nowrap">{` ${shoppingPayment.totalDebit} CUP`}</span>}
      className={cn('ring-1 ring-gray-400 rounded-2xl py-0.5 px-2', className)}
    />
  );
};


export const KpiTelegram = ({ className }: StyleProps) => {
  const { business, onFetch } = useBusiness();
  const businessUpdateShopping = useBusinessUpdateShopping();

  if (!business) {
    return <></>;
  }
  const { telegramBotChat } = business || {};

  return (
    <LabelValuePair
      label={<span className="text-nowrap">Telegram</span>}
      value={
        <span className="text-nowrap">
          {telegramBotChat ? (
            <SvgCheckCircleSolid className="fill-green-500 size-5" />
          ) : (
            <div className="flex items-center">
              <SvgTimesCircleSolid className="fill-red-500 size-5" />
              <Button
                label="Activar"
                variant="link"
                onClick={() => {
                  businessUpdateShopping.open({
                    onAfterSuccess: () => {
                      business && onFetch({ routeName: business?.routeName });
                    },
                  });
                }}
              />
            </div>
          )}
        </span>
      }
      className={cn('ring-1 ring-gray-400 rounded-2xl py-0.5 px-2', className)}
    />
  );
};
