import React from 'react'
import { useState } from 'react';
import UserData from '../../../services/userData';
import TokenService from '../../../services/token.service';
import { useNavigate } from "react-router-dom";
import { ROUTING } from '../../../utils/routes';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

 const ChangePassword = () => {
    const { updatePassword } = UserData();
    const { clearToken } = TokenService();
    const navigate = useNavigate();

    const [passwordData, setPasswordData] = useState({
        old_password: "",
        new_password: "",
    });

    const getLoginInput = e => {
        const name = e.target.name;
        const value = e.target.value;
        setPasswordData({ ...passwordData, [name]: value })
    }

    const formSubmit = e => {
        e.preventDefault();
        const updatePasswordData = { ...passwordData }
        console.log(updatePasswordData)
        updatePassword(updatePasswordData).then((res) => {
            if(res?.data?.success === 0){
                toast.error('Invalid Password');
            }
            else{
                clearToken();
            }
            // navigate(ROUTING.LOGOUT)
            console.log(res, 'responseLogin')
        }).catch((err) => {
            console.log(err, "loginResponseErr")
        })
    }
    return (
        <React.Fragment>
            <div className="login">
                <div className="card">
                    <div className="card-body">
                    {/* <ToastContainer
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
                    /> */}
                        <div className="loginOuter">
                            <div className="loginHeader">
                                Change Your Password
                            </div>
                            <form className="loginBody" onSubmit={formSubmit}>
                                <div className="fields">
                                    <label htmlFor="oldPassword">Old Password</label>
                                    <input type="password" name='old_password' onChange={getLoginInput}  required/>
                                </div>
                                <div className="fields">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input type="password" name='new_password' onChange={getLoginInput}  required/>
                                </div>

                                <div className="fields">
                                    <button>
                                        Change
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
export default ChangePassword
