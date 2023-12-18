import axios from "axios";
import TokenService from "./tokenService";
import { baseUrl } from "./baseUrl";
import axiosService from "./axiosInterceptor";


const dashboardService = () => {
    const { getToken } = TokenService();
    const token = getToken()
    let newToken = token.slice(1, -1);
    const { axios } = axiosService()


    const getTotalData = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/dashboard/doctor/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            }
        };
        return axios.request(config)
    }
    const getTotalUser = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/dashboard/user/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            }
        };
        return axios.request(config)
    }
    const getTotalProducts = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/dashboard/product/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            }
        };
        return axios.request(config)
    }
   
    const getTotalClients = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/dashboard/client/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            }
        };
        return axios.request(config)
    }
    const getTotalBookings = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/dashboard/booking/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            }
        };
        return axios.request(config)
    }
    const getTotalInsurance = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/dashboard/insurance/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            }
        };
        return axios.request(config)
    }
   

    return { getTotalData, getTotalUser, getTotalProducts, getTotalClients, getTotalBookings, getTotalInsurance }
}
export default dashboardService;