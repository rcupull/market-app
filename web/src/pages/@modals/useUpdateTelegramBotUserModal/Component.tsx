import { useUpdateTelegramChatBotUser } from 'features/api/user/useUpdateTelegramChatBotUser';
import { useAuth } from 'features/api-slices/useAuth';

import { TelegramActivationSteps } from 'pages/@common/telegram-activation-steps';

export interface ComponentProps {
  onAfterSuccess?: () => void;
}

export const Component = ({ onAfterSuccess }: ComponentProps) => {
  const { authData } = useAuth();

  const { updateTelegramChatBotUser } = useUpdateTelegramChatBotUser();

  const user = authData?.user;

  return (
    <TelegramActivationSteps
      status={updateTelegramChatBotUser.status}
      onFetch={(formArgs) => {
        if (!user) return;
        const { code } = formArgs.value;
        const { _id } = user;

        if (code) {
          updateTelegramChatBotUser.fetch(
            { code, userId: _id },
            {
              onAfterSuccess: (response) => {
                formArgs.onAfterSuccess?.(response);
                onAfterSuccess?.();
              },
              onAfterFailed: formArgs.onAfterFailed,
            }
          );
        }
      }}
    />
  );
};

export default Component;
