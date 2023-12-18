
import axios from 'axios';
import TokenService from './tokenService';

const AxiosSettings = () => {
    const { clearToken, getToken } = TokenService();
    const token = getToken()
    let newToken = token?.slice(1, -1);

    axios.interceptors.request.use(
        async (config) => {
            config.headers.Authorization = `Bearer ${newToken}`;
            return config;
        },
        (error) => {
            // Handle request error
            return Promise.reject(error);
        }
    );

    // Add response interceptor
    axios.interceptors.response.use(
        (response) => {
            // Process successful responses
            return response;
        },
        (error) => {
            // Handle response error
            if (error.response.status === 401) {
                // Redirect to the login page or perform any desired logic
                clearToken()
            }
            return Promise.reject(error);
        }
    );
    return { axios }
}

export default AxiosSettings