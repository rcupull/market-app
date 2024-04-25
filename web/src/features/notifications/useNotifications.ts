import { useContext } from 'react';

import { NotificationsContext } from './provider';

export const useNotifications = () => useContext(NotificationsContext);
