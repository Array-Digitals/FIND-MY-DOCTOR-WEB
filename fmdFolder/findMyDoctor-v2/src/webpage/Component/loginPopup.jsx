import React, { useState } from 'react'
import googleImage from '../../assets/images/registration/icons8-google-96.png'
import facebookImage from '../../assets/images/registration/icons8-facebook-96.png'
import AuthService from '../../services/auth.service';
import { Link } from 'react-router-dom';
import { ROUTING } from '../../utils/routes';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import TokenService from '../../services/token.service';
import UserData from '../../services/userData';
import LabService from '../BookLab/labService';
import { Loader } from './loader';
import { LoginSocialGoogle } from 'reactjs-social-login';
import googleImg from '../../assets/images/registration/google.png'


export const LoginPopup = ({ myDialogRef1, onRegisteredBeneChange }) => {
    const [isLoading, setIsLoading] = useState(false);
    // const { isBeneficiary } = LabService();
    const { postBeneficiary } = UserData();
    const { handleLogin } = AuthService();
    const { userToken, setUserObject } = TokenService();
    const getBeneSession = () => {
        const getBeneNoUser = localStorage.getItem("temporaryBeneficiary");
        const beneObject = JSON.parse(getBeneNoUser);
        return beneObject
    }

    const handleRegisteredBeneUpdate = (value) => {
        onRegisteredBeneChange(value);
    };

    const modalClose1 = () => {
        const myDialog = document.getElementById('myDialog1');
        myDialog.close();
    }
    const openModalRegister = () => {
        const myDialogRegister = document.getElementById('myDialog');
        myDialogRegister.showModal();
    }

    const [login, setLogin] = useState({
        email: "",
        password: "",
    });
    const getSignupInput = e => {
        const name = e.target.name;
        const value = e.target.value;
        setLogin({ ...login, [name]: value })
    }
    const formSubmit = e => {
        e.preventDefault();
        const loginData = { ...login }
        setIsLoading(true);
        handleLogin(loginData).then((res) => {
            if (res?.data?.success && res?.data?.data?.type == "1") {

                let token = res?.data?.token;
                let userData = res?.data?.data;
                setUserObject(userData)
                userToken(token);
                console.log(getBeneSession(), "beneLOg");

                // console.log(beneficiary,'nigga benee');

                if (getBeneSession()) {

                    postBeneficiary(getBeneSession()).then((res) => {
                        onRegisteredBeneChange(res?.data?.data?.insertId);
                    }).catch((res) => {
                        console.log("post bene error", res);
                    })
                }

                modalClose1();
                // localStorage.removeItem('temporaryBeneficiary');

            }
            else {
                toast.error('invalid Login!');
            }
        }).catch((err) => {
            console.log(err, "loginResponseErr")
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const closeLoginOpenSignup = (e) => {
        e.preventDefault();
        modalClose1();
        openModalRegister();
    }


    const [isShowPass, setIsShowPass] = useState(false)
    const showPass = (e) => {
        e.preventDefault();
        setIsShowPass(!isShowPass)
    }

    const responseGoogle = (response, data) => {
        console.log(data, 'dasjbdja');
        const { email_verified, expires_in, authuser, locale, picture, prompt, scope, access_token, token_type, given_name, name, family_name, ...newData } = data


        // const randomDigits = Math.floor(10000 + Math.random() * 90000);
        // const google_id = `${family_name}${given_name}${randomDigits}`;

        const modifiedData = {
            email: newData.email,
            google_access: newData.sub,
        };
        // console.log(modifiedData, 'kdnwkn');
        setIsLoading(true);


        handleLogin(modifiedData).then((res) => {
            // console.log(res, 'responseLogin')

            if (res?.data?.success && res?.data?.data?.type == "1") {

                let token = res?.data?.token;
                let userData = res?.data?.data;
                setUserObject(userData)
                userToken(token);
                console.log(getBeneSession(), "beneLOg");

                // console.log(beneficiary,'nigga benee');

                if (getBeneSession()) {

                    postBeneficiary(getBeneSession()).then((res) => {
                        onRegisteredBeneChange(res?.data?.data?.insertId);
                    }).catch((res) => {
                        console.log("post bene error", res);
                    })
                }

                modalClose1();
                // localStorage.removeItem('temporaryBeneficiary');

            }
            else {
                toast.error('invalid Login!');
            }

        }).catch((err) => {
            console.log(err, "loginResponseErr")

        }).finally(() => {
            setIsLoading(false)

        })

    }

    return (
        <React.Fragment>
            <div className="SignupPopMain">
                <dialog id="myDialog1" ref={myDialogRef1}>

                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    
                    <div className="dialogMain">
                        <div className="closeButton" onClick={modalClose1}>
                            <i className="ri-close-line"></i>
                        </div>
                        <div className="dialogInner">
                            {/* {isLoading ?
                                <Loader />
                                : */}
                            <>
                                <h1>Authentication</h1>
                                <form className="authFormMain" onSubmit={formSubmit}>

                                    <div className="authField">
                                        <i className="formIcon ri-mail-line"></i>

                                        <div className="formFieldsInner form-floating mb-3 ">
                                            <input type="email" placeholder='Email' className="form-control userInputName" id="floatingInput" name='email' onChange={getSignupInput} />
                                            <label htmlFor="floatingInput">Enter Email Address...</label>
                                        </div>
                                    </div>

                                    <div className="authField">
                                        <i className="formIcon ri-lock-line"></i>

                                        <div className="formFieldsInner inputShowPassword3 form-floating mb-3 ">
                                            <input type={isShowPass ? 'text' : 'password'} className="form-control userInputName" id="floatingInput" placeholder='password' name='password' onChange={getSignupInput} />
                                            <label htmlFor="floatingInput">Enter Password</label>
                                            <button className='inputShowPasswordButton3' onClick={showPass}>
                                                <i className="ri-eye-line"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="authField">
                                        <div className="signupPopupButton">
                                            <button onClick={closeLoginOpenSignup}>Signup</button>
                                        </div>
                                    </div>
                                    <div className="authField">
                                        <button className="themeButton authPopupButton">Submit</button>
                                    </div>
                                    <div className="authField loginOthers">
                                        <LoginSocialGoogle
                                            client_id={"792328529943-tl3hbpbafbj7g16s89rb2e3p5kgg9c65.apps.googleusercontent.com"}
                                            scope="openid profile email"
                                            discoveryDocs="claims_supported"
                                            access_type="offline"
                                            // onResolve={ ({ provider, data }) => { console.log(provider, data)}}
                                            onResolve={({ provider, data }) => responseGoogle(provider, data)}
                                            onReject={(err) => {
                                                console.log(err);
                                            }}
                                        >
                                            <button onClick={(e)=> {e.preventDefault()}}>
                                                <img loading="lazy" src={googleImg} alt="reload page" />
                                                Google Sign In
                                            </button>
                                            {/* <GoogleLoginButton /> */}
                                        </LoginSocialGoogle>

                                    </div>
                                    {/* <div className="authField">
                                            <button className="linkedInButton">
                                                <img loading="lazy" src={facebookImage} alt="reload page" />
                                                <p>Facebook Sign In</p>
                                            </button>
                                        </div> */}
                                </form>
                            </>

                            {/* } */}

                        </div>
                    </div>
                </dialog>
            </div>

        </React.Fragment>
    )
}
