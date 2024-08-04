//eslint-disable-next-line
import { initializeApp } from 'firebase/app';
//eslint-disable-next-line
import { getMessaging, Messaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyBKEPIapVZDDWamBZmtp6w2y-hbRl72dro',
  authDomain: 'multi-store-2b052.firebaseapp.com',
  projectId: 'multi-store-2b052',
  storageBucket: 'multi-store-2b052.appspot.com',
  messagingSenderId: '470555603384',
  appId: '1:470555603384:web:b248e54d613911fac91f4d',
  measurementId: 'G-YDBQCJFYDN'
};

export const firebaseVapidKey =
  'BLAHgECFF0nxAQZIKGMdPXvEwGt-i_BDjA0TyCruSaKse5RnyZt-JA9OzDAkSoUHoCyk_MdLBtBCSWIfPzxvUy0';

const firebaseApp = initializeApp(firebaseConfig);

export const getFirebaseMessaging = (): Messaging => getMessaging(firebaseApp);
