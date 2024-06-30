import { useUpdateTelegramChatBotUser } from 'features/api/user/useUpdateTelegramChatBotUser';
import { useAuth } from 'features/api-slices/useAuth';

import { Portal } from 'hooks/usePortal';

import { TelegramActivationSteps } from 'pages/@common/telegram-activation-steps';

export interface ComponentProps {
  portal: Portal;
  onAfterSuccess?: () => void;
}

export const Component = ({ portal, onAfterSuccess }: ComponentProps) => {
  const { authData } = useAuth();

  const { updateTelegramChatBotUser } = useUpdateTelegramChatBotUser();

  const user = authData?.user;

  return (
    <TelegramActivationSteps
      portal={portal}
      getSubmitBtnProps={({ resetForm, value }) => ({
        isBusy: updateTelegramChatBotUser.status.isBusy,
        onClick: () => {
          if (!user) return;
          const { code } = value;
          const { _id } = user;

          if(code){
            updateTelegramChatBotUser.fetch(
              { code, userId: _id },
              {
                onAfterSuccess: () => {
                  resetForm();
                  onAfterSuccess?.();
                },
              },
            );
          }
          
        },
      })}
    />
  );
};

export default Component;
