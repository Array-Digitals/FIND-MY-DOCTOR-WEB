import axios from "axios";
import TokenService from "./tokenService";
import { baseUrl } from "./baseUrl";

const axiosService = () => {
    const { getToken, clearToken } = TokenService();
    const token = getToken();
    let newToken = token?.slice(1, -1);

    // Add a request interceptor
    axios.interceptors.request.use(
        (config) => {
            return config;
        },
        (error) => {
            // Do something with request error
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
        (response) => {
            const resMsg = response.data.message
            // Do something with the response data
            if (resMsg) {
                const formatedMsg = resMsg.toLowerCase().replace(/\s/g, '')
                if (formatedMsg == 'invalidtoken') {
                    clearToken()
                    console.log('workinggg')
                }
            }

            return response;
        },
        (error) => {
            // Do something with response error
            return Promise.reject(error);
        }
    );

    return { axios };
};

export default axiosService;