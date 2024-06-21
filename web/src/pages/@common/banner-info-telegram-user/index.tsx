import { Button } from 'components/button';
import { LabelValuePair } from 'components/label-value-pair';

import { useAuth } from 'features/api-slices/useAuth';

import SvgCheckCircleSolid from 'icons/CheckCircleSolid';
import SvgTimesCircleSolid from 'icons/TimesCircleSolid';
import { useUpdateTelegramBotUserModal } from 'pages/@modals/useUpdateTelegramBotUserModal';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export const BannerInfoTelegramUser = ({ className }: StyleProps) => {
  const { authData, onRefreshAuthUser } = useAuth();
  const updateTelegramBotUserModal = useUpdateTelegramBotUserModal();

  const user = authData?.user;

  if (!user) {
    return <></>;
  }

  const { telegramBotChat } = user;

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
                  updateTelegramBotUserModal.open({
                    onAfterSuccess: () => {
                      onRefreshAuthUser()
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
