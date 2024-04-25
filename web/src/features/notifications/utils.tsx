import { Badge } from 'components/badge';

//eslint-disable-next-line
import { initializeApp } from 'firebase/app';
//eslint-disable-next-line
import { getMessaging, Messaging } from 'firebase/messaging';

export const renderNotificationsContent = (notification: Notification) => {
  const { body, title } = notification;

  return (
    <div className="flex">
      <Badge variant="success" />

      <div className="ms-3">
        <h3 className="text-gray-800 font-semibold ">{title}</h3>
        <div className="text-sm text-gray-700 ">{body}</div>
      </div>
    </div>
  );
};

const firebaseConfig = {
  apiKey: "AIzaSyBKEPIapVZDDWamBZmtp6w2y-hbRl72dro",
  authDomain: "multi-store-2b052.firebaseapp.com",
  projectId: "multi-store-2b052",
  storageBucket: "multi-store-2b052.appspot.com",
  messagingSenderId: "470555603384",
  appId: "1:470555603384:web:b248e54d613911fac91f4d",
  measurementId: "G-YDBQCJFYDN"
};

export const firebaseVapidKey =
  'BLAHgECFF0nxAQZIKGMdPXvEwGt-i_BDjA0TyCruSaKse5RnyZt-JA9OzDAkSoUHoCyk_MdLBtBCSWIfPzxvUy0';


const firebaseApp = initializeApp(firebaseConfig);

export const getFirebaseMessaging = (): Messaging => getMessaging(firebaseApp);

