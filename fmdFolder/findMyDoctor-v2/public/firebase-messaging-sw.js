importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');


var firebaseConfig = {
    apiKey: "AIzaSyDcJnpQLd-KMNRShgcehZqYTE6B7RYIEqM",
    authDomain: "findmydoctor-f4a2f.firebaseapp.com",
    projectId: "findmydoctor-f4a2f",
    storageBucket: "findmydoctor-f4a2f.appspot.com",
    messagingSenderId: "513849749912",
    appId: "1:513849749912:web:e8be0e5625ef2dfad2fbed",
    measurementId: "G-JN4N9N2YV2"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Retrieve firebase messaging
  const messaging = firebase.messaging();
  
  messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
  
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });