import { useEffect, useState } from 'react';

import { useGetUserNotifications } from 'features/api/user/useGetUserNotifications';
import { usePersistentContext } from 'features/persistent/usePersistentContext';
import { useApiPersistentPaginated } from 'features/slices/useApiPersistentPaginated';

import { useAuth } from './useAuth';

import { FetchStatus } from 'types/api';
import { PushNotification } from 'types/notifications';

export const useUserNotifications = (): {
  onRefresh: (args?: { onlyUnread?: boolean }) => void;
  reset: () => void;
  status: FetchStatus;
  data: Array<PushNotification>;
  onlyUnread: boolean;
} => {
  const { getUserNotifications } = useGetUserNotifications();
  const [onlyUnread, setOnlyUnread] = useState(false);

  const { data, fetch, reset, status } = useApiPersistentPaginated(
    'useUserNotifications',
    getUserNotifications
  );

  const { getPersistent, setPersistent } = usePersistentContext();

  const { user } = useAuth();

  useEffect(() => {
    getPersistent('onlyUnread').then((v) => setOnlyUnread(v || false));
  }, []);

  return {
    onlyUnread,
    reset,
    status,
    data: data ?? [],
    onRefresh: async (args) => {
      if (!user) return;
      const newOnlyUnread = args?.onlyUnread ?? onlyUnread;

      if (newOnlyUnread !== onlyUnread) {
        setPersistent('onlyUnread', newOnlyUnread);
        setOnlyUnread(newOnlyUnread);

        fetch({ userId: user._id, onlyUnread: newOnlyUnread });
      } else {
        const savedOnlyUnread = await getPersistent('onlyUnread');
        fetch({ userId: user._id, onlyUnread: savedOnlyUnread });
      }
    }
  };
};
