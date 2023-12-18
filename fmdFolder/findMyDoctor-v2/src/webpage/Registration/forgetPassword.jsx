import React, { useState } from 'react'
import { ROUTING } from '../../utils/routes';
import { useNavigate } from 'react-router-dom';
import ForgetPasswordFunc from '../../services/forgetPassword';


 const ForgetPassword = () => {
    const { postResetEmail, postForgetPassword } = ForgetPasswordFunc();

    const [showDiv, setShowDiv] = useState(false);
    const [email, setEmail] = useState();
    const [getPassword, setGetPassword] = useState({
        email: "",
        password: "",
        link: ""
    })
    const navigate = useNavigate();

    const getFormInput = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setGetPassword({ ...getPassword, [name]: value })
    }

    const emailSubmit = (e) => {
        e.preventDefault();
        const resetEmail = { email }
        console.log(resetEmail)
        postResetEmail(resetEmail).then((res) => {
            console.log(res, "this is email form")
            if (res?.data?.success != 0) {
                setShowDiv(true)
            }
        }).catch((res) => {
            console.log(res)
        })
    }


    const ForgetPasswordSubmit = e => {
        e.preventDefault();
        const resetPassword = { ...getPassword, email }
        console.log(resetPassword)
        postForgetPassword(resetPassword).then((res) => {
            console.log(res, "this is main form")
            // if (res?.data?.success === 1) {
            //     console.log(showDiv, "showDiv")
            //     setShowDiv(true)
            // }
        }).catch((res) => {
            console.log(res)
        })
    }
    return (
        <React.Fragment>
            <div className="login">
                <div className="card">
                    <div className="card-body">
                        {
                            !showDiv ?
                                <div className="loginOuter">
                                    <div className="loginHeader">
                                        Type Your Email Address
                                    </div>
                                    <form className="loginBody" id='my-form1' onSubmit={emailSubmit}>
                                        <div className="fields">
                                            <label htmlFor="emailLogin">Email</label>
                                            <input type="email" onChange={(e) => { setEmail(e.target.value) }} />
                                        </div>
                                        <div className="fields">
                                            <button type='submit' >
                                                Submit
                                            </button>
                                        </div>

                                    </form>
                                </div>

                                :

                                <div>
                                    Check Your Email
                                </div>

                            // <div className="loginOuter">
                            //     <div className="loginHeader">
                            //         Enter Confirmation
                            //     </div>
                            //     <form id='my-form2' className="loginBody" onSubmit={ForgetPasswordSubmit}>
                            //         <div className="fields">
                            //             <label>Email</label>
                            //             <input type="email" name='email' onChange={getFormInput} />
                            //         </div>
                            //         <div className="fields">
                            //             <label>New Pasword</label>
                            //             <input type="password" name='password' onChange={getFormInput} />
                            //         </div>
                            //         <div className="fields">
                            //             <label>Confirmation Code</label>
                            //             <input type="text" name='link' onChange={getFormInput} />
                            //         </div>
                            //         <div className="fields">
                            //             <button type='submit' >
                            //                 Submit
                            //             </button>
                            //         </div>

                            //     </form>
                            // </div>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default ForgetPassword
