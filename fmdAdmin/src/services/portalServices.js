import axios from "axios";
import TokenService from "./tokenService";
import { baseUrl } from "./baseUrl";
import AxiosSettings from "./axiosInterceptor";


const portalServices = () => {
    const { getToken } = TokenService();
    const token = getToken()
    let newToken = token.slice(1, -1);
    const { axios } = AxiosSettings();


    const bannerPost = data => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/banner/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios.request(config)
    }
    const bannerDelete = data => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${baseUrl}/banner/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios.request(config)
    }
    
    const bannerAllGet = data => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/banner/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios.request(config)
    }
    const contactAllGet = data => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/contact/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios.request(config)
    }
    const newLetterAllGet = data => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/contact/news`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios.request(config)
    }
    return { bannerPost, bannerAllGet, bannerDelete , contactAllGet, newLetterAllGet}
}
export default portalServices;