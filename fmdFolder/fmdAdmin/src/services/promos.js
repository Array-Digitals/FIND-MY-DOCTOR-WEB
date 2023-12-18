import axios from "axios";
import TokenService from "./tokenService";
import { baseUrl } from "./baseUrl";
import axiosService from "./axiosInterceptor";


const promoServices = () => {
    const { getToken } = TokenService();
    const token = getToken()
    let newToken = token.slice(1, -1);
    const { axios } = axiosService()


    const getPromoCode = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/promo/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            }
        };
        return axios.request(config)
    }
    const getPromoCodeType = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/promo/types/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            }
        };
        return axios.request(config)
    }

    const addPromoCode = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/promo/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios.request(config)
    }
    const deletePromoCode = () => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${baseUrl}/promo/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            }
        };
        return axios.request(config)
    }

    return { getPromoCode, getPromoCodeType, addPromoCode, deletePromoCode }
}
export default promoServices;