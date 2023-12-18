import React, { useState, useRef } from 'react'
import googleImage from '../../assets/images/registration/icons8-google-96.png'
import facebookImage from '../../assets/images/registration/icons8-facebook-96.png'
import AuthService from '../../services/auth.service';
import { LoginPopup } from './loginPopup';
import { LoginSocialGoogle } from 'reactjs-social-login';
import googleImg from '../../assets/images/registration/google.png'
import {toast} from 'react-toastify'


export const SignupPopup = ({ myDialogRef }) => {

    const [isLoading, setIsLoading] = useState(false);

    const [phoneError, setPhoneError] = useState(false);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const openModalLogin = () => {
        const myDialogLogin = document.getElementById('myDialog1');
        myDialogLogin.showModal();
    }

    const { handleRegister, OnSuccessRegister } = AuthService();

    const modalClose = () => {
        const myDialog = document.getElementById('myDialog');
        myDialog.close();
    }

    const [signup, setSignup] = useState({
        fullname: "",
        email: "",
        phone: "",
        password: "",
    });
    const getSignupInput = e => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'phone') {
            const phoneValue = value.trim();
            // Check if the value is empty or exactly 13 characters long
            if (phoneValue.length === 11 || phoneValue.length === 12) {
                setPhoneError(false);
                setSubmitButtonDisabled(false);
            } else {
                setPhoneError(true);
                setSubmitButtonDisabled(true);
            }
        }

        setSignup({ ...signup, [name]: value })
    }

    const formSubmit = e => {
        e.preventDefault();
        const signUpVar = { ...signup }

        handleRegister(signUpVar).then((res) => {
            modalClose();
            openModalLogin();
            // OnSuccessRegister(res)

        }).catch((err) => {
            // console.log(err, 'responseRegisterError')

            if (err?.response?.status === 409) {
                toast.error('Email already registered')
            }

        }).finally(() => {
            // setIsLoading(false)
        })
    }

    const responseGoogle = (response, data) => {
        console.log(data, 'dasjbdja');
        setIsLoading(true);

        const { email_verified, expires_in, authuser, locale, picture, prompt, scope, access_token, token_type, given_name, family_name, ...newData } = data

        const randomDigits = Math.floor(10000 + Math.random() * 90000);
        const google_id = `${family_name}${given_name}${randomDigits}`;

        const modifiedData = {
            fulloname: newData.name,
            email: newData.email,
            google_access: newData.sub,
            google_id,
        };


        console.log(modifiedData, 'asjfbj');

        handleRegister(modifiedData).then((res) => {
            // console.log(modifiedData)
            // console.log(res, 'responseRegistered')
            modalClose();
            openModalLogin();
            // OnSuccessRegister(res)
        }).catch((err) => {
            // console.log(err, 'responseRegisterError')

            if (err?.response?.status === 409) {
                toast.error('Email already registered')
            }
            console.log(err, 'error');


        }).finally(() => {
            setIsLoading(false)
        })

    }

    const [isShowPass, setIsShowPass] = useState(false)
    const showPass = (e) => {
        e.preventDefault();
        setIsShowPass(!isShowPass)
    }

    return (
        <React.Fragment>
            <div className="SignupPopMain">

                <dialog id="myDialog" ref={myDialogRef}>
                    <div className="dialogMain">
                        <div className="closeButton" onClick={modalClose}>
                            <i className="ri-close-line"></i>
                        </div>
                        <div className="dialogInner">
                            <h1>Authentication</h1>
                            <form className="authFormMain" onSubmit={formSubmit}>
                                <div className="authField">
                                    <i className="formIcon ri-user-3-line"></i>

                                    <div className="formFieldsInner form-floating mb-3 ">
                                        <input type="text" placeholder='Full Name' className="form-control userInputName" id="floatingInput" name='fullname' onChange={getSignupInput} required />
                                        <label htmlFor="floatingInput">Enter Full Name...</label>
                                    </div>
                                </div>
                                <div className="authField">
                                    <i className="formIcon ri-mail-line"></i>

                                    <div className="formFieldsInner form-floating mb-3 ">
                                        <input type="email" placeholder='Email' className="form-control userInputName" id="floatingInput" name='email' onChange={getSignupInput} required />
                                        <label htmlFor="floatingInput">Enter Email Address...</label>
                                    </div>
                                </div>
                                <div className="authField">
                                    <i className="formIcon ri-phone-line"></i>
                                    <div className={` formInputRelative formFieldsInner form-floating mb-3  ${phoneError ? 'error' : ''}`}>
                                        <input type="phone" placeholder='Phone' className="form-control userInputName" id="floatingInput" name='phone' onChange={getSignupInput} required />
                                        <label htmlFor="floatingInput">Enter Contact Number...</label>
                                        {phoneError && <p className="errorMessage">Enter Valid Phone Number</p>}
                                    </div>
                                </div>
                                <div className="authField">
                                    <i className="formIcon ri-lock-line"></i>
                                    <div className="formFieldsInner inputShowPassword3 form-floating mb-3 ">
                                        <input placeholder='Password' type={isShowPass ? 'text' : 'password'} className="form-control userInputName" id="floatingInput" name='password' onChange={getSignupInput} required />
                                        <label htmlFor="floatingInput">Enter Password</label>
                                        <button className='inputShowPasswordButton3' onClick={showPass}>
                                            <i className="ri-eye-line"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className={`authField  ${submitButtonDisabled ? 'beneErrorButton' : ''}`}>
                                    <button className="themeButton authPopupButton" disabled={submitButtonDisabled}>Submit</button>
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
                        </div>
                    </div>
                </dialog>
            </div>

        </React.Fragment>
    )
}
