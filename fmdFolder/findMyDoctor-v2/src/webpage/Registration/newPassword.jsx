import React, { useState } from 'react'
import { ROUTING } from '../../utils/routes';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ForgetPasswordFunc from '../../services/forgetPassword';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';


const NewPassword = () => {
    const { postResetEmail, postForgetPassword } = ForgetPasswordFunc();
    const location = useLocation();
    const navigate = useNavigate()
    // console.log(location, 'params');
    const [passKey, setPassKey] = useState('');
    const filterUrl = () => {
        const searchParams = new URLSearchParams(location.search);
        const keyValue = searchParams.get('key');
        setPassKey(keyValue)
    }

    useEffect(() => {
        filterUrl()
    }, [])
    // console.log(passKey, 'pasdkeyy');
    // const [showDiv, setShowDiv] = useState(false);
    // const [email, setEmail] = useState();
    const [getPassword, setGetPassword] = useState({
        email: "",
        password: "",
    })
    // const navigate = useNavigate();

    const getFormInput = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setGetPassword({ ...getPassword, [name]: value })
    }

    // const emailSubmit = (e) => {
    //     e.preventDefault();
    //     const resetEmail = { email }
    //     console.log(resetEmail)
    //     postResetEmail(resetEmail).then((res) => {
    //         console.log(res, "this is email form")
    //         if (res?.data?.success != 0) {
    //             setShowDiv(true)
    //         }
    //     }).catch((res) => {
    //         console.log(res)
    //     })
    // }


    const ForgetPasswordSubmit = e => {
        e.preventDefault();
        const resetPassword = { ...getPassword, link: passKey }
        console.log(resetPassword)
        postForgetPassword(resetPassword).then((res) => {
            console.log(res, "this is main form")
            const response = res.data.data;
            if (res.data.success == 1) {
                navigate(ROUTING.LOGIN)
            }
            else {
                if (res.data.data == 'Invalid email') {
                    toast.error('Invalid Email')
                }
                else if (res.data.data == 'Link Expired') {
                    toast.error('Link Expired')
                }
            }

        }).catch((res) => {
            console.log(res)
        })
    }
    return (
        <React.Fragment>
            <div className="login">
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
                <div className="card">
                    <div className="card-body">

                        <div className="loginOuter">
                            <div className="loginHeader">
                                Enter Confirmation
                            </div>
                            <form id='my-form2' className="loginBody" onSubmit={ForgetPasswordSubmit}>
                                <div className="fields">
                                    <label>Email</label>
                                    <input type="email" name='email' onChange={getFormInput} />
                                </div>
                                <div className="fields">
                                    <label>New Pasword</label>
                                    <input type="password" name='password' onChange={getFormInput} />
                                </div>
                                {/* <div className="fields">
                                    <label>Confirmation Code</label>
                                    <input type="text" name='link' onChange={getFormInput} />
                                </div> */}
                                <div className="fields">
                                    <button type='submit' >
                                        Submit
                                    </button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default NewPassword
