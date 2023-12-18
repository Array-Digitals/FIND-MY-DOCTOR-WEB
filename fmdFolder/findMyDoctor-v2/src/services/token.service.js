import { useNavigate } from "react-router-dom";
import { ROUTING } from "../utils/routes";
import { useEffect, useState, useContext } from "react";
import { rememberContext } from "../context/contextFile";
import Cookies from 'js-cookie';

const TokenService = () => {
    const navigate = useNavigate();
    const rememberContextVal = useContext(rememberContext);


    const rememberGet = () => {
        const getRemember = localStorage.getItem("remember");
        return getRemember
    }
    const rememberSet = (data) => {
        if (data) {
            localStorage.setItem("remember", JSON.stringify(data));
        }
    }


    // const getToken = (rememberMe = false) => {
    //     let getToken = null;
    //     if (rememberMe) {
    //         getToken = localStorage.getItem("token");
    //         // console.log(getToken,'getToken');
    //     }
    //     else {
    //         getToken = localStorage.getItem("token");
    //     }
    //     return getToken
    // }

    // const userToken = (token, rememberMe = false) => {
    //     if (rememberMe) {
    //         localStorage.setItem("token", JSON.stringify(token));
    //     }
    //     else {
    //         localStorage.setItem("token", JSON.stringify(token));
    //     }
    // }
    // const setUserObject = (data, rememberMe = false) => {
    //     if (rememberMe) {
    //         localStorage.setItem("data", JSON.stringify(data));
    //     }
    //     else {
    //         localStorage.setItem("data", JSON.stringify(data));
    //     }
    // }
    // const getStorageData = (rememberMe = false) => {
    //     let savedData = null;
    //     if (rememberMe) {

    //         savedData = JSON.parse(localStorage.getItem("data"));
    //     }
    //     else {
    //         savedData = JSON.parse(localStorage.getItem("data"));

    //     }
    //     return savedData;
    // }










    const oneDayFromNow = new Date();
    oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);


    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    const cookieAttributes = {
        expires: oneDayFromNow,       // Expires in 1 days
        path: '/',        // Accessible across the entire domain
        secure: false,     // Only sent over HTTPS
        httpOnly: false,   // Accessible only through HTTP
        sameSite: 'strict' // Send cookie only if the request is from the same site
    };
    const cookieAttributes2 = {
        expires: sevenDaysFromNow,   // Expires in 7 days
        path: '/',        // Accessible across the entire domain
        secure: false,     // Only sent over HTTPS
        httpOnly: false,   // Accessible only through HTTP
        sameSite: 'strict' // Send cookie only if the request is from the same site
    };


    function userToken(token, rememberMe = false) {
        // console.log(data, 'addddd');
        if (rememberMe) {
            Cookies.set('token', JSON.stringify(token), cookieAttributes2);
        } else {
            Cookies.set('token', JSON.stringify(token), cookieAttributes);
        }
    }

    function getToken(rememberMe = false) {
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ');

        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === 'token') {
                const decodedData = decodeURIComponent(cookieValue);
                return JSON.parse(decodedData);
            }
        }
        return null;
    }


    function setUserObject(data, rememberMe = false) {
        // console.log(data, 'addddd');
        if (rememberMe) {
            Cookies.set('data', JSON.stringify(data), cookieAttributes2);
        } else {
            Cookies.set('data', JSON.stringify(data), cookieAttributes);
        }
    }
    function getStorageData(rememberMe = false) {
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ');

        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === 'data') {
                const decodedData = decodeURIComponent(cookieValue);
                return JSON.parse(decodedData);
            }
        }
        return null;
    }

    function deleteCookie() {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        console.log('cookieDeleted');
    }
    function deleteUserCookie() {
        document.cookie = "data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        console.log('cookieUserDeleted');
    }



    const clearToken = () => {
        localStorage.clear();
        deleteCookie();
        deleteUserCookie();
        localStorage.clear();
        navigate(ROUTING.HOMEPAGE)
        // window.location.reload();
    }





    return { userToken, setUserObject, getStorageData, clearToken, getToken, rememberSet, rememberGet }

}

export default TokenService