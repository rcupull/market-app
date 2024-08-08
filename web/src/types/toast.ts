import { PushNotification } from './notifications';

export interface ToastMessage {
  body: React.ReactNode;
  title: React.ReactNode;
  meta: PushNotification | undefined;
}
