import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../../services/authService';

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
            console.log(res, 'responseLogin')
            onSuccessLogin(res);
        }).catch((err) => {
            console.log(err, "loginResponseErr")
        }).finally(() => {
            setIsLoading(false)
            // window.location.href = ROUTING.HOMEPAGE;
        })
    }
    
    return (
        <>
            <div className="login">
                <div className="card">
                    <div className="card-body">
                        <div className="loginOuter">
                            <div className="loginHeader">
                                Sign in your account
                            </div>
                            <form className="loginBody" onSubmit={formSubmit}>
                                <div className="fields">
                                    <label htmlFor="emailLogin">Email</label>
                                    <input type="email" name='email' onChange={getLoginInput}/>
                                </div>
                                <div className="fields">
                                    <label htmlFor="passwordLogin">Password</label>
                                    <input type="password" name='password' onChange={getLoginInput} />
                                </div>
                                <div className="fields fields1">
                                    <div>
                                        <input type="checkbox" />
                                        <span>Remember me</span>
                                    </div>
                                    <Link>
                                        Forgot Password?
                                    </Link>
                                </div>
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
