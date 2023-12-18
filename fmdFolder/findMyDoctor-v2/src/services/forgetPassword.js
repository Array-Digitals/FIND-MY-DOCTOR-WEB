import axios from "axios";
import { baseUrl } from "./baseUrl";

const ForgetPasswordFunc = () =>{
    // const baseUrl = 'https://fmd.arraydigitals.com/api';
    
    const postResetEmail = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/users/reset-pass`,
            data: data
        };

        return axios.request(config)
    }

    const postForgetPassword = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/users/change-password`,
            data: data
        };

        return axios.request(config)
    }
    return {postResetEmail, postForgetPassword}
}
export default ForgetPasswordFunc;