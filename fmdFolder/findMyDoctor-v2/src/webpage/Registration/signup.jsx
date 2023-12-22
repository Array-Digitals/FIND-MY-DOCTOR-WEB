import React, { useState } from 'react'
import signinImg from '../../assets/images/registration/register1.png'
import googleImg from '../../assets/images/registration/google.png'
import { Link } from 'react-router-dom'
import AuthService from '../../services/auth.service'
// import { loading } from '../Component/loading'
import faceBookImg from '../../assets/images/faccebookLogo.png'
import { ROUTING } from '../../utils/routes'
import { GoogleLoginButton, FacebookLoginButton } from 'react-social-login-buttons';
import { LoginSocialGoogle, LoginSocialFacebook } from 'reactjs-social-login'
// import FacebookLogin from 'react-facebook-login';
import banner1 from '../../assets/images/banners/desktopBanner/signUpDesk.jpg'
import MobBanner1 from '../../assets/images/banners/mobileBanner/signUpMob.jpg'
import { ToastContainer, toast } from 'react-toastify'

const Signup = () => {

    const [phoneError, setPhoneError] = useState(false);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const { handleRegister, OnSuccessRegister } = AuthService();
    const [isShowPass, setIsShowPass] = useState(false)
    const showPass = (e) => {
        e.preventDefault();
        setIsShowPass(!isShowPass)
    }
    const [isShowPass1, setIsShowPass1] = useState(false)
    const showPass1 = (e) => {
        e.preventDefault();
        setIsShowPass1(!isShowPass1)
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
        if (password !== confirmPassword) {
            setPasswordsMatch(false);
            return
        } else {
            setPasswordsMatch(true);
        }
        const insuranceVar = { ...signup, password }
        setIsLoading(true);

        handleRegister(insuranceVar).then((res) => {
            console.log(insuranceVar)
            console.log(res, 'responseRegistered')
            OnSuccessRegister(res)
        }).catch((err) => {
            console.log(err?.response.status, 'responseRegisterError')
            if (err?.response?.status === 409) {
                toast.error('Email already registered')
            }
        }).finally(() => {
            setIsLoading(false)
        })
    }


    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };




    const responseFacebook = (response) => {
        console.log(response, "fb login Result");
    }
    const componentClicked = (response) => {
        console.warn(response, "fb login failed");
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
            console.log(modifiedData)
            console.log(res, 'responseRegistered')
            OnSuccessRegister(res)
        }).catch((err) => {
            // console.log(err, 'responseRegisterError')

            console.log(err, 'error');


        }).finally(() => {
            setIsLoading(false)
        })

    }
    return (
        <>
            <main >
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
                <div className="loginForm">
                    <section className="loginBanner">
                        <div className="banner">
                            <div className="bannerInner">
                                <picture>
                                    <source srcSet={banner1} media='(min-width: 991px)' />
                                    <img loading="lazy" src={MobBanner1} alt="reload page" />
                                </picture>
                            </div>
                        </div>
                    </section>
                    <div className="login">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5">
                                    <div className="sideImageDiv">
                                        <img loading="lazy" src={signinImg} alt="reload page" />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7" align="center">
                                    <form className="loginMain" onSubmit={formSubmit}>
                                        <div className="heading">
                                            <p>Sign Up</p><small>Already have an account? <Link to={ROUTING.LOGIN}>Sign In</Link> </small>
                                        </div>
                                        <div className="loginInputFields">
                                            <input type="text" placeholder='Enter Full Name...' name='fullname' onChange={getSignupInput} required />
                                        </div>
                                        {/* <div className="loginInputFields">
                                            <input type="text" placeholder='Enter User Name...' name='userName' onChange={getSignupInput} />
                                        </div> */}
                                        <div className="loginInputFields">
                                            <input type="email" placeholder='Enter Email Address...' name='email' onChange={getSignupInput} required />
                                        </div>

                                        <div className={`loginInputFields ${phoneError ? 'error' : ''}`}>
                                            <input type="number" placeholder='Enter Contact Number...' name='phone' onChange={getSignupInput} required />

                                        </div>

                                        <div className="loginInputFields2 ">
                                            <div className="loginInputFields2Inner">

                                                <div className="passwordFieldReg inputShowPassword2">
                                                    <input type={isShowPass ? 'text' : 'password'} placeholder='Enter Password...' name='password' onChange={handlePasswordChange} required />
                                                    <button className='inputShowPasswordButton2' onClick={showPass}>
                                                        <i className="ri-eye-line"></i>
                                                    </button>
                                                </div>
                                                <div className="passwordFieldReg inputShowPassword2">
                                                    <input type={isShowPass1 ? 'text' : 'password'} placeholder='Confirm Password...' onChange={handleConfirmPasswordChange} required />
                                                    <button className='inputShowPasswordButton2' onClick={showPass1}>
                                                        <i className="ri-eye-line"></i>
                                                    </button>
                                                </div>
                                                {!passwordsMatch && (
                                                    <div className='passwordMatch' >Passwords do not match</div>
                                                )}
                                            </div>

                                        </div>

                                        {phoneError &&
                                            <div className="signupError">
                                                <p className="errorMessage">* Enter Valid Phone Number</p>
                                            </div>
                                        }
                                        {!isLoading && <div className="loginButton">
                                            <button className='signUpButton' disabled={submitButtonDisabled} type='submit'>Sign Up</button>
                                        </div>}

                                        {isLoading && <p>Loading...</p>}

                                        <div className='orDiv'>
                                            <p>or</p>
                                        </div>
                                        <div className="loginOther">
                                            <LoginSocialGoogle
                                                client_id={"792328529943-tl3hbpbafbj7g16s89rb2e3p5kgg9c65.apps.googleusercontent.com"}
                                                scope="openid profile email"
                                                discoveryDocs="claims_supported"
                                                access_type="offline"
                                                onResolve={({ provider, data }) => responseGoogle(provider, data)}
                                                onReject={(err) => {
                                                    console.log(err);
                                                }}
                                            >
                                                <button>
                                                    <img loading="lazy" src={googleImg} alt="reload page" />
                                                    Google Sign In
                                                </button>
                                                {/* <GoogleLoginButton /> */}
                                            </LoginSocialGoogle>


                                        </div>

                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </main >
        </>
    )
}

export default Signup