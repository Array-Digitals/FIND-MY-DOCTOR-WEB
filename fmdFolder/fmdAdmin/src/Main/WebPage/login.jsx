import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../../services/authService';
import logo from '../../assets/images/Logo.png'
import { toast, ToastContainer } from "react-toastify";


export const Login = () => {
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
    const formSubmit = e => {
        e.preventDefault();
        const loginData = { ...login }
        console.log(loginData)
        setIsLoading(true);
        handleLogin(loginData).then((res) => {
            // console.log(res, 'responseLogin')
            onSuccessLogin(res);
        }).catch((err) => {
            console.log(err, "loginResponseErr")
        }).finally(() => {
            setIsLoading(false)
            // window.location.href = ROUTING.HOMEPAGE;
        })
    }

    const[isPasswordVisible, setIsPasswordVisible] = useState(false)
    return (
        <>
            <div className="login">
                <div className='bg_element_1'></div>
                    <div className='bg_element_2'></div>
                <div className="card">
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
                <div className='loginLogoOuterPage'><img src={logo} className='loginLogo' alt="" /></div>
                    <div className="card-body">
                        <div className="loginOuter">
                            <div className="loginHeader">
                                Sign in to your account
                            </div>
                            <form className="loginBody" onSubmit={formSubmit}>
                                <div className="fields">
                                    <label htmlFor="emailLogin">Email</label>
                                    <input type="email" name='email' onChange={getLoginInput} required/>
                                </div>
                                <div className="fields fieldPasswordRelative">
                                    <label htmlFor="passwordLogin">Password</label>
                                    <input type={isPasswordVisible ? 'text' : 'password'} name='password' onChange={getLoginInput} required />
                                    <i className="ri-eye-line" onClick={() => {setIsPasswordVisible(!isPasswordVisible)}} />
                                </div>
                                {/* <div className="fields fields1">
                                <div className='loginCheckBox'>
                                        <input type="checkbox" id='rememberMe' />
                                        <label  htmlFor='rememberMe'>Remember me</label>
                                    </div>
                                    <Link>
                                        Forgot Password?
                                    </Link>
                                </div> */}
                                <div className="fields">
                                    <button>
                                        Sign In
                                    </button>
                                </div>
                            
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
