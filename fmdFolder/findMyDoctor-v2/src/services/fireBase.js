import React from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken as getFCMToken, onMessage } from 'firebase/messaging';

const FireBaseService = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyDcJnpQLd-KMNRShgcehZqYTE6B7RYIEqM",
        authDomain: "findmydoctor-f4a2f.firebaseapp.com",
        projectId: "findmydoctor-f4a2f",
        storageBucket: "findmydoctor-f4a2f.appspot.com",
        messagingSenderId: "513849749912",
        appId: "1:513849749912:web:e8be0e5625ef2dfad2fbed",
        measurementId: "G-JN4N9N2YV2"

    };

    const firebaseApp = initializeApp(firebaseConfig);
    const messaging = getMessaging(firebaseApp);

    const getTokenFireBase = async (setTokenFound) => {
        try {
            const currentToken = await getFCMToken(messaging, { vapidKey: 'BHStMFJHiKgFkxU3R6xg5WMuZVQXyOcM7Jbbl5DKj1hZUlzdTFoPZ1vjMYhJzk5mOKPGMZzsVj-4eD7vQoe0q3M' });
            if (currentToken) {
                // console.log('current token for client: ', currentToken);
                setTokenFound(true);
            } else {
                console.log('No registration token available. Request permission to generate one.');
                setTokenFound(false);
            }
        } catch (err) {
            console.log('An error occurred while retrieving token. ', err);
        }
    };

    const onMessageListener = () =>
        new Promise((resolve) => {
            onMessage(messaging, (payload) => {
                resolve(payload);
            });
        });

    return { getTokenFireBase, onMessageListener };
};

export default FireBaseService;