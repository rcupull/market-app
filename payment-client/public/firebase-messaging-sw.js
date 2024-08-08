/*eslint-disable */
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');

const app = firebase.initializeApp({
  apiKey: "AIzaSyBKEPIapVZDDWamBZmtp6w2y-hbRl72dro",
  authDomain: "multi-store-2b052.firebaseapp.com",
  projectId: "multi-store-2b052",
  storageBucket: "multi-store-2b052.appspot.com",
  messagingSenderId: "470555603384",
  appId: "1:470555603384:web:b248e54d613911fac91f4d",
  measurementId: "G-YDBQCJFYDN"
});

const messaging = firebase.messaging(app);

messaging.onBackgroundMessage((payload) => {
  console.log('onBackgroundMessage payload sw', payload);
  const notificationTitle = payload.notification?.title;
  const notificationOptions = {
    body: payload.notification?.body,
    icon: payload.notification?.icon,
  };
  if (notificationTitle)
    return self.registration.showNotification(notificationTitle, notificationOptions);
});
