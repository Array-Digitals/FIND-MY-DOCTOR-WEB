import axios from "axios";
import TokenService from "./tokenService";
import { baseUrl } from "./baseUrl";
import axiosService from "./axiosInterceptor";


const insuranceService = () => {
    const { getToken } = TokenService();
    // const baseUrl = 'https://fmd.arraydigitals.com/api';
    // const baseUrl = 'http://192.168.18.96:3000/api';
    const token = getToken()
    let newToken = token.slice(1, -1);
    const { axios } = axiosService()



    const insurancePlanPost = data => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/insurance-plans/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios.request(config)
    }
    const insurancePlanUpdate = data => {
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${baseUrl}/insurance-plans/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios.request(config)
    }
    const insurancePlanGetAll = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/insurance-plans/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };
        return axios.request(config)
    }
    const insurancePlanSingleGet = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/insurance-plans/${id}`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };
        return axios.request(config)
    }
    const insurancePlanDelete = (data) => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${baseUrl}/insurance-plans/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios.request(config)
    }

    const insuranceProviderPost = data => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/insurace-providers/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios.request(config)
    }
    const insuranceProviderUpdate = data => {
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${baseUrl}/insurace-providers`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios.request(config)
    }
    const insuranceProviderGetAll = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/insurace-providers/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };
        return axios.request(config)
    }
    const insuranceProviderGet = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/insurace-providers/${id}`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };
        return axios.request(config)
    }
    const insuranceProviderDelete = (data) => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${baseUrl}/insurace-providers/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios.request(config)
    }
    const insuranceAllBookingGet = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/booking-insurance/${id}`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },

        };
        return axios.request(config)
    }
    const insuranceProviderBookingGet = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/insurace-providers/booking/${id}`,
            headers: {
                // 'Authorization': `Bearer ${newToken}`,
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };
        return axios.request(config)
    }
    const bookingVerifyPatch = (data) => {
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${baseUrl}/booking-insurance/verify`,
            headers: {
                // 'Authorization': `Bearer ${newToken}`,
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data:data
        };
        return axios.request(config)
    }


    return {bookingVerifyPatch, insuranceProviderBookingGet, insuranceAllBookingGet, insuranceProviderDelete, insurancePlanUpdate, insuranceProviderUpdate, insuranceProviderGet, insuranceProviderGetAll, insuranceProviderPost, insurancePlanPost, insurancePlanGetAll, insurancePlanSingleGet, insurancePlanDelete }
}
export default insuranceService;