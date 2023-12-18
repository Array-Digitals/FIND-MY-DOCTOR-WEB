import React, { useState } from 'react'
import LoginImg from '../../assets/images/registration/login1.png'
import googleImg from '../../assets/images/registration/google.png'
import { Link } from 'react-router-dom'
import faceBookImg from '../../assets/images/faccebookLogo.png'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../../services/auth.service'
// import { Loading } from '../Component/loading';
import { ROUTING } from '../../utils/routes';
import { GoogleLoginButton, FacebookLoginButton } from 'react-social-login-buttons';
import { LoginSocialGoogle, LoginSocialFacebook } from 'reactjs-social-login'
import banner1 from '../../assets/images/banners/desktopBanner/loginDesk.jpg'
import MobBanner1 from '../../assets/images/banners/mobileBanner/loginMob.jpg'
import e from 'cors'
import TokenService from '../../services/token.service'
import { useEffect } from 'react'
import { rememberContext } from '../../context/contextFile'
import { Loader } from '../Component/loader'

const Login = ({ isLogin }) => {

    const { rememberSet } = TokenService();
    const { handleLogin, onSuccessLogin } = AuthService();

    const [isLoading, setIsLoading] = useState(false)

    const [login, setLogin] = useState({
        email: "",
        password: "",
    });
    const getLoginInput = e => {
        const name = e.target.name;
        const value = e.target.value;
        setLogin({ ...login, [name]: value })
    }


    const [rememeberState, setRememberState] = useState(false)
    //  const getRememeberInput = (e) =>{
    //     setRememberState(e.target.checked ? true : false)
    // }


    // console.log(rememeberState, 'rememberState');
    const formSubmit = e => {


        e.preventDefault();
        const loginData = { ...login }
        console.log(loginData)
        setIsLoading(true);

        handleLogin(loginData).then((res) => {
            console.log(res, 'responseLogin')
            isLogin(true);
            onSuccessLogin(res, rememeberState);
            rememberSet(rememeberState);

        }).catch((err) => {
            console.log(err, "loginResponseErr")
            isLogin(false);
        }).finally(() => {
            setIsLoading(false)
            // window.location.href = ROUTING.HOMEPAGE;
        })
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
        console.log(modifiedData, 'kdnwkn');
        setIsLoading(true);


        handleLogin(modifiedData).then((res) => {
            console.log(res, 'responseLogin')
            isLogin(true);
            onSuccessLogin(res, rememeberState);
            rememberSet(rememeberState);

        }).catch((err) => {
            console.log(err, "loginResponseErr")
            isLogin(false);
        }).finally(() => {
            setIsLoading(false)

        })

    }
    // console.log(isRemember, 'isRemember');
    return (
        <React.Fragment>
            {/* {isLoading && <Loading />}
            {!isLoading && */}



            <main >
                <div className="loginForm">
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
                    {
                        isLoading ?
                            <Loader />
                            :
                            <div className="login">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6" align="center">
                                            <form className="loginMain" onSubmit={formSubmit}>
                                                <div className="heading">
                                                    <p>Log In</p><small>Don't have an account? <Link to={ROUTING.SIGNUP}>Sign Up</Link> </small>
                                                </div>
                                                <div className="loginInputFields">
                                                    <input type="email" placeholder='Email...' name='email' onChange={getLoginInput} required />
                                                </div>
                                                <div className="loginInputFields inputShowPassword">
                                                    <input type={isShowPass ? 'text' : 'password'} placeholder='Password...' name='password' onChange={getLoginInput} required />
                                                    <button className='inputShowPasswordButton' onClick={showPass}>
                                                        <i className="ri-eye-line" />
                                                    </button>
                                                </div>
                                                <div className="infoDiv">
                                                    <div className="rememberDiv">
                                                        <input type="checkbox" onChange={(e) => { setRememberState(e.target.checked) }} />
                                                        <span>Remember me</span>
                                                    </div>
                                                    <div className="forgetDiv">
                                                        <Link to={ROUTING.FORGET_PASSWORD}>Forget Password?</Link>
                                                    </div>
                                                </div>
                                                <div className="loginButton">
                                                    <button type='submit'>Log In</button>
                                                </div>
                                                <div className='orDiv'>
                                                    <p>or</p>
                                                </div>
                                                <div className="loginOther">
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
                                                        <button>
                                                            <img loading="lazy" src={googleImg} alt="reload page" />
                                                            Google Sign In
                                                        </button>
                                                        {/* <GoogleLoginButton /> */}
                                                    </LoginSocialGoogle>

                                                    {/* 
                                                    <LoginSocialFacebook
                                                        appId="1245060279487561"

                                                        onResolve={(res) => {
                                                            console.log(res);
                                                        }}
                                                        onReject={(err) => {
                                                            console.log(err);
                                                        }}
                                                    >
                                         
                                                        <button>
                                                            <img loading="lazy" src={faceBookImg} alt="reload page" />
                                                            Facebook Sign In
                                                        </button>
                                                    </LoginSocialFacebook> */}


                                                </div>

                                            </form>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                            <div className="sideImageDiv">
                                                <img loading="lazy" src={LoginImg} alt="reload page" />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                    }

                </div>
            </main >


        </React.Fragment>
    )
}
export default Login