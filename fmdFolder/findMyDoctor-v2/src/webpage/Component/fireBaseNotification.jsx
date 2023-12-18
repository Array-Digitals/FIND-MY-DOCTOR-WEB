import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
// import { getMessaging, onMessage } from 'firebase/messaging'; // Import Firebase messaging
import { getMessaging, onMessage } from 'firebase/messaging';
import { useLayoutEffect } from 'react';
import FireBaseService from '../../services/fireBase';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




export const FireBaseNotification = () => {
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({ title: '', body: '' });
    const [isTokenFound, setTokenFound] = useState(false);
    const { getTokenFireBase, onMessageListener } = FireBaseService();

    useEffect(() => {
        getTokenFireBase(setTokenFound);
        onMessageListener().then(payload => {
            setNotification({ title: payload.notification.title, body: payload.notification.body })
            // setShow(true)
            // toast.success(payload.notification.title)
            const { title, body } = payload.notification;
            toast(
                <CustomToast title={title} body={body} />,
                {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    // Add any other toast customization options here as needed
                }
            );
            console.log(payload);
        }).catch(err => console.log('failed: ', err));
    })

    const CustomToast = ({ title, body }) => {
        return (
            <div>
                <h3>{title}</h3>
                <p>{body}</p>
            </div>
        );
    };



    // return (
    //     <React.Fragment>
    //         <ToastContainer
    //             position="top-center"
    //             autoClose={5000}
    //             hideProgressBar={false}
    //             newestOnTop={false}
    //             closeOnClick
    //             rtl={false}
    //             pauseOnFocusLoss
    //             draggable
    //             pauseOnHover
    //             theme="light"
    //         />
    //     </React.Fragment>
    // )
};